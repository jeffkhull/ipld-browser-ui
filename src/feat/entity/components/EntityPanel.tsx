import { Box } from '@chakra-ui/react'
import * as Reach from '@reach/router'
import { css } from 'emotion'
import React, { useEffect, useState } from 'react'
import { Element as SlateNode } from 'slate'

import { notifMutators, useNotificationStore } from '../../notifications/stores/NotificationStore'
import { UserFavorite } from '../../preferences/models/user-favorite.model'
import { ErrorBoundary } from '../../telemetry/components/ErrorBoundary'
import { userStoreSelectors, useUserStore } from '../../user/stores/UserStore'
import { EntityHeader } from '../model/entity-header.model'
import { EntityDocService } from '../services/entity-doc.service'
import { EntityHeaderService } from '../services/entity-header.service'
import { entityMemoryState } from '../stores/entity-memory-state.model'
import { entityStoreMutators, entityStoreSelectors, useEntityStore } from '../stores/entity.store'
import { EntityHeaderComponent } from './EntityPanel/EntityHeader'
import * as serverActions from './EntityPanel/entityPanelActions'
import { EntityRightContextItems } from './EntityPanel/EntityRightContextMenu'
import { EntitySlateEditor } from './EntityPanel/EntitySlateEditor'
import { OutboundRelationCreateModal } from './EntityPanel/OutboundRelationCreateModal'

export const initialEditorValue: SlateNode[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

export function EntityPanel(props: {
  path?: string
  style?: React.CSSProperties
  entityId?: string
}) {
  const entityStore = useEntityStore(entityStoreSelectors.all)

  //   const [entityClasses, setEntityClasses] = EntityStore.useEntityClasses();
  const entityName = useEntityStore(entityStoreSelectors.entityName)
  const setEntityName = useEntityStore(entityStoreMutators.setName)
  // const [entityModificationProps, setEntityModificationProps] = React.useState<BaseDbTable>({})
  const [isEditing, setIsEditing] = React.useState(false)
  const [isFavorited, setIsFavorited] = React.useState(false)
  const [slateEditorContent, setSlateEditorContent] = useState<SlateNode[]>(initialEditorValue)
  const user = useUserStore(userStoreSelectors.user)
  const [entityIsUpdating, setEntityIsUpdating] = React.useState(false)
  const nameUpdateTimeoutRef = React.useRef<number>()
  const docUpdateTimeoutRef = React.useRef<number>()
  const [obRelCreateModalOpen, setObRelCreateModalOpen] = React.useState(false)

  const incrementWaiters = useNotificationStore(notifMutators.incrementWaiters)
  const decrementWaiters = useNotificationStore(notifMutators.decrementWaiters)

  React.useEffect(() => {
    incrementWaiters()
    setTimeout(() => {
      decrementWaiters()
    }, 500)
  }, [entityStore.ENTITY_ID])

  entityStore.ENTITY_ID

  const rehydrateEntity = React.useCallback(async (entityId: string) => {
    await serverActions.rehydrateEntity(
      entityId,
      (entity: EntityHeader) => {
        setEntityName(entity.name)
        entityStore.setNamespaceId(entity.namespaceId)
        entityStore.setIsDeprecated(entity.isDeprecated)
      },
      setSlateEditorContent,
      () => {},
      incrementWaiters,
      decrementWaiters,
      entityStore.setClass,
    )
  }, [])

  const rehydrateClassesAndEntity = React.useCallback(async (entityId: string) => {
    // const res = await classApi.getAllEntityClasses()
    // setEntityClasses(res.Classes);
    await rehydrateEntity(entityId)
  }, [])

  const initFavorited = React.useCallback(async (entityId: string) => {
    await serverActions.getUserFavoritesForTarget(entityId, (favs: UserFavorite[]) => {
      favs.forEach((x) => {
        if (x.targetId === props.entityId) {
          setIsFavorited(true)
          return
        }
      })
    })
  }, [])

  useEffect(() => {
    if (props.entityId != null) {
      entityStore.setId(props.entityId)
      void initFavorited(props.entityId)
      void rehydrateClassesAndEntity(props.entityId)
    }
  }, [props.entityId])

  const doEntityNameUpdate = React.useCallback(
    async (newName: string) => {
      if (entityStore.ENTITY_ID == null) return

      window.clearTimeout(nameUpdateTimeoutRef.current)
      setEntityIsUpdating(true)

      nameUpdateTimeoutRef.current = window.setTimeout(() => {
        if (
          entityMemoryState.nameUpdatePending &&
          !entityMemoryState.nameIsUpdating &&
          entityStore.ENTITY_ID != null
        ) {
          entityMemoryState.nameIsUpdating = true
          void EntityHeaderService.updateEntityName(entityStore.ENTITY_ID, newName).then((x) => {
            entityMemoryState.nameUpdatePending = false
            entityMemoryState.nameIsUpdating = false
            setEntityIsUpdating(false)
          })
        }
      }, 500)
    },
    [
      entityStore.ENTITY_ID,
      entityStore.ENTITY_NAMESPACE_ID,
      entityMemoryState.nameIsUpdating,
      entityMemoryState.nameUpdatePending,
    ],
  )

  const createNewEntity = React.useCallback(
    async (name: string, callback: (newEntityId: string) => void) => {
      const newEntity = await EntityHeaderService.createEntity(name, user.defaultNamespaceId)
      entityStore.setId(newEntity._id)
      callback(newEntity._id)
      setEntityName(name)
      void Reach.navigate(`/item/${newEntity._id}`)
    },
    [user.defaultNamespaceId],
  )

  return (
    <ErrorBoundary regionName="Entity Panel">
      {obRelCreateModalOpen && (
        <OutboundRelationCreateModal
          defaultNamespaceId={user.defaultNamespaceId}
          sourceEntityName={entityName}
          sourceEntityId={entityStore.ENTITY_ID || ''}
          okCallback={() => {
            setObRelCreateModalOpen(false)
          }}
          cancelCallback={() => {
            setObRelCreateModalOpen(false)
          }}
        />
      )}
      <Box
        id="entity-panel-wrapper"
        className={css`
          display: flex;
          flex-direction: column;
          height: 100%;
        `}
      >
        <Box id="top-wrapper" flex="0 0 8rem">
          <EntityHeaderComponent
            rehydrateEntityFromServer={() => rehydrateEntity(props.entityId || '')}
            isUpdating={entityIsUpdating}
            setIsFavorited={setIsFavorited}
            isFavorited={isFavorited}
            isEditing={isEditing}
            entityName={entityName}
            setEntityName={(name: string) => {
              setEntityName(name)
              entityMemoryState.nameUpdatePending = true
              void doEntityNameUpdate(name)
            }}
            setIsEditing={setIsEditing}
            createNewEntity={createNewEntity}
          />
        </Box>
        <Box
          id="bottom-wrapper"
          className={css`
            flex: 1 0 20vh;
            display: flex;
            flex-direction: row;
            border-top: 1px solid lightgrey;
          `}
        >
          <Box
            id="editor-container"
            className={css`
              flex: 0 0 60vw;
            `}
          >
            <EntitySlateEditor
              triggerOutboundRelationCreate={() => {
                setObRelCreateModalOpen(true)
              }}
              setEditorContent={(content: any) => {
                setSlateEditorContent(content)

                if (props.entityId != null) EntityDocService.saveLocalDraft(props.entityId, content)
              }}
              isEditing={isEditing}
              slateEditorContent={slateEditorContent}
            />
          </Box>
          <Box
            id="item-facts-container"
            className={css`
              width: 100%;
              border-left: 1px solid lightgrey;
              padding: 25px;
            `}
          >
            <EntityRightContextItems
              entityId={entityStore.ENTITY_ID || ''}
              entityModificationProps={{}}
              setOutboundRelationCreateOpen={setObRelCreateModalOpen}
            />
            {/* Footer */}
          </Box>
        </Box>
      </Box>
    </ErrorBoundary>
  )
}
