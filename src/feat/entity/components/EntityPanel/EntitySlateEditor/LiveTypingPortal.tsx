import { css } from 'emotion'
import React from 'react'
import * as Slate from 'slate'

import * as helpers from './helpers'
import { LiveTypingPortalProps } from './LiveTypingPortal/LiveTypingPortalProps'
import * as subComponents from './LiveTypingPortal/subComponents'
import { userStoreSelectors, useUserStore } from '../../../../user/stores/UserStore'
import {
  notifSelectors,
  useNotificationStore,
} from '../../../../notifications/stores/NotificationStore'
import { NotificationService } from '../../../../notifications/services/NotificationService'
import { spaceSelectors, useSpacesStore } from '../../../../spaces/stores/SpacesStore'
import { EntityHeaderService } from '../../../services/entity-header.service'
import { IndexedItem } from '../../../../search/IxSearchModel/IndexedItem'
import { IndexedItemType } from '../../../../search/IxSearchModel/IndexedItemType'

const selectedColor = '#B4D5FF'

// padding: "1px 3px",
// borderRadius: "3px",

const selectedItemStyle = css`
  padding: 1px 3px;
  border-radius: 3px;
`

export function LiveTypingPortal(props: LiveTypingPortalProps) {
  //   const notifActions = NotificationStore.useNotifActions();

  const notifStore = useNotificationStore(notifSelectors.all)
  const notifService = React.useMemo(() => {
    return new NotificationService(notifStore)
  }, [notifStore])

  const currentSpace = useSpacesStore(spaceSelectors.currentSpace)

  const user = useUserStore(userStoreSelectors.user)

  React.useEffect(() => {
    console.log(`indexedItems`, props.indexedItems)
  }, [props.indexedItems])

  const createNewSubjectEntity = React.useCallback(
    async (
      name: string,
      namespaceId: string,
      editor: Slate.Editor,
      targetSelection: Slate.Location,
    ) => {
      notifStore.incrementWaiters()
      const newEntity = await EntityHeaderService.createEntityFromName(name, namespaceId)

      const item: IndexedItem = {
        id: newEntity._id,
        name: name,
        type: IndexedItemType.ENTITY,
        priority: 0,
      }

      Slate.Transforms.select(editor, targetSelection)
      helpers.insertSubjEntityLink(props.editor, item)

      props.setLtBoxTarget(null)
      notifStore.decrementWaiters()
    },
    [],
  )

  return (
    <subComponents.Portal>
      <div
        ref={props.cursorRef}
        style={{
          top: '-9999px',
          left: '-9999px',
          position: 'absolute',
          zIndex: 1,
          padding: '3px',
          background: 'white',
          borderRadius: '4px',
          boxShadow: '0 1px 5px rgba(0,0,0,.2)',
        }}
      >
        {props.indexedItems.map((item, i) => (
          <div
            key={item.id}
            className={selectedItemStyle}
            style={{
              background: i === props.selectionIndex ? selectedColor : 'transparent',
            }}
            onClick={(event) => {
              event.preventDefault()

              void helpers.processLtItemSelection(
                props.editor,
                props.ltBoxTarget,
                props.curData,
                props.searchType,
                props.indexedItems[i],
                props.setLtBoxTarget,
              )
            }}
          >
            {item.name}
          </div>
        ))}
        <div
          key={'createnew'}
          className={selectedItemStyle}
          style={{
            background: props.indexedItems.length === 0 ? selectedColor : 'transparent',
          }}
          onClick={(event) => {
            if (props.inlineSearchString === null || props.inlineSearchString === '') {
              return
            }

            if (props.searchType === IndexedItemType.ENTITY) {
              void createNewSubjectEntity(
                props.inlineSearchString,
                // TODO - get current namespace
                currentSpace?._id,
                props.editor,
                props.ltBoxTarget,
              )
            } else {
              console.log(`could not find handler for search type ${props.searchType}!`)
            }
          }}
        >
          <i>
            {props.searchType === IndexedItemType.ENTITY
              ? 'Create new item'
              : 'Create new relation '}{' '}
            '{props.inlineSearchString}'
          </i>
        </div>
      </div>
    </subComponents.Portal>
  )
}
