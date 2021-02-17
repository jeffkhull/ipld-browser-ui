import { Box } from '@chakra-ui/react'
import { css } from 'emotion'
import React from 'react'

import { entityStoreSelectors, useEntityStore } from '../../stores/entity.store'
import { EntityEditButtons } from './EntityHeader/EntityEditButtons'
import { TitleWithClassSelector } from './EntityHeader/TitleWithClassSelector'

export interface EntityHeaderProps {
  createNewEntity: (name: string, callback: (newEntityId: string) => void) => void
  entityName: string
  isEditing: boolean
  isFavorited: boolean
  isUpdating: boolean
  rehydrateEntityFromServer: () => void
  setEntityName: (title: string) => void
  setIsEditing: (isEditing: boolean) => void
  setIsFavorited: (input: boolean) => void
}

export function EntityHeaderComponent(props: EntityHeaderProps) {
  const entityStore = useEntityStore(entityStoreSelectors.all)

  return (
    <Box
      id="entity-header"
      className={css`
        display: flex;
        flex-direction: row;
        padding: 10px;
        padding-right: 30px;
        padding-top: 25px;
      `}
    >
      <TitleWithClassSelector
        isEditing={props.isEditing}
        cssClassName={css`
          flex: 1 0 30vw;
        `}
        title={props.entityName}
        setTitle={(newName: string) => {
          props.setEntityName(newName)
        }}
        isDeprecated={entityStore.ENTITY_IS_DEPRECATED}
      />
      <Box
        className={css`
          flex: 0 1 50vw;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
        `}
      >
        <EntityEditButtons
          entId={entityStore.ENTITY_ID || ''}
          rehydrateEntityFromServer={props.rehydrateEntityFromServer}
          setIsFavorited={props.setIsFavorited}
          isFavorited={props.isFavorited}
          isEditing={props.isEditing}
          setIsEditing={props.setIsEditing}
          createNewEntity={props.createNewEntity}
          isUpdating={props.isUpdating}
        />
      </Box>
    </Box>
  )
}
