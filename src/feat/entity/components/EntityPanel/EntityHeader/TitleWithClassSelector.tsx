import { css, cx } from 'emotion'
import { Box, Button, Text } from '@chakra-ui/react'
import * as Icons from 'grommet-icons'
import React from 'react'
import { entityStoreSelectors, useEntityStore } from '../../../stores/entity.store'
import {
  userStoreMutators,
  userStoreSelectors,
  useUserStore,
} from '../../../../user/stores/UserStore'
import { GenericModal, LockedTextInput } from '../../../../../common/components'
import { ClassSelector } from '../../../../class/components/ClassSelector'
import { EntityHeaderService } from '../../../services/entity-header.service'

export interface TitleWithClassSelectorProps {
  isEditing: boolean
  title: string
  setTitle: (newtitle: string) => void
  cssClassName: string
  isDeprecated: boolean
}

export function TitleWithClassSelector(props: TitleWithClassSelectorProps) {
  const entityStore = useEntityStore(entityStoreSelectors.all)

  const [isEditingClass, setIsEditingClass] = React.useState(false)
  const [selectedClassId, setSelectedClassId] = React.useState('')
  const [selectedClassName, setSelectedClassName] = React.useState('')
  const user = useUserStore(userStoreSelectors.user)
  const setUser = useUserStore(userStoreMutators.setUser)

  const title = React.useMemo(() => {
    if (!props.isDeprecated) return props.title

    return `${props.title} (MOVED TO TRASH)`
  }, [props.title, props.isDeprecated])

  const updateEntityClass = React.useCallback(
    async (entityId: string, classId: string) => {
      // await updateEntityClass(entityId, classId)
      await EntityHeaderService.updateEntityClass(entityId, classId)
      setIsEditingClass(false)
      entityStore.setClass({
        ...entityStore.ENTITY_CLASS,
        value: selectedClassName,
        id: classId,
      } as any)
    },
    [entityStore.ENTITY_CLASS, selectedClassName, user?.defaultNamespaceId],
  )

  return (
    <Box id="title-with-class-selector" className={cx(props.cssClassName, css``)}>
      {isEditingClass && (
        <GenericModal
          id="edit-class-modal"
          title="Change Item Type"
          cancelCallback={() => {
            setIsEditingClass(false)
          }}
          okCallback={() => {
            if (entityStore.ENTITY_ID == null) return

            void updateEntityClass(entityStore.ENTITY_ID, selectedClassId)
          }}
          height="300px"
          width="400px"
          showCancelButton
        >
          <ClassSelector
            cssClassName={css``}
            setSelectedClassId={(val: string) => {
              //   console.log(`sel class id is now `, val);
              setSelectedClassId(val)
            }}
            setSelectedClassName={(val: string) => {
              console.log(`sel class name is `, val)
              setSelectedClassName(val)
            }}
            defaultNamespaceId={user.defaultNamespaceId}
            autofocus={true}
          />
        </GenericModal>
      )}
      <LockedTextInput
        textInputClassName={css`
          padding-top: 2px;
          padding-bottom: 5px;
        `}
        containerClassName={css``}
        id="entity-title-input"
        isEditing={props.isEditing}
        value={title}
        setValue={props.setTitle}
        editable
        placeholder="Type Item Title"
      />
      <Box
        className={css`
          padding-left: 11px;
          display: flex;
          flex-direction: row;
        `}
      >
        <Text
          size="large"
          className={css`
            font-style: italic;
            margin-right: 7px;
          `}
        >
          {entityStore.ENTITY_CLASS?.name || 'No type assigned'}
        </Text>
        {/* {props.isEditing && ( */}
        <Button
          size="small"
          leftIcon={<Icons.Edit size="18px" />}
          variant="ghost"
          onClick={() => setIsEditingClass(true)}
        ></Button>
        {/* )} */}
      </Box>
      {/* <EntityClassSelector
        cssClassName={css`
          height: 30px;
          padding-left: 11px;
          width: 400px;
        `}
      /> */}
    </Box>
  )
}
