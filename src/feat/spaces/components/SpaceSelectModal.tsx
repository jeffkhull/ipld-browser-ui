import { Button, Text } from '@chakra-ui/react'
import { css } from 'emotion'
import React from 'react'
import { GrAdd } from 'react-icons/gr'

import { GenericModal } from '../../../common/components'
import { Namespace } from '../model/namespace.model'
import { NamespaceService } from '../services/namespace.service'
import { spaceSelectors, useSpacesStore } from '../stores/SpacesStore'
import { NamespaceEditModal } from './NamespaceEditModal'

export interface SpaceSelectModalProps {
  closeModal: () => void
}

export function SpaceSelectModal(props: SpaceSelectModalProps) {
  const selectedSpaces = useSpacesStore((state) => state.selectedSpaceIds)
  const setSelectedSpaces = useSpacesStore((state) => state.setSelectedSpaceIds) as (
    newSpaces: string[],
  ) => void
  const currentSpace = useSpacesStore(spaceSelectors.currentSpace)
  const availableSpaces = useSpacesStore(spaceSelectors.availableSpaces)
  const [nsEditOpen, setNsEditOpen] = React.useState(false)

  return (
    <>
      {nsEditOpen && (
        <NamespaceEditModal
          okCallback={async (ns: Namespace) => {
            await NamespaceService.createNamespace(ns.name, ns.owningUser)
            setNsEditOpen(false)
          }}
          cancelCallback={() => {
            setNsEditOpen(false)
          }}
        />
      )}
      <GenericModal
        okCallback={props.closeModal}
        cancelCallback={props.closeModal}
        height="30rem"
        width="40rem"
        title="Space Selection"
      >
        <Text>Current Space: {currentSpace?.name}</Text>
        <Text>Available spaces ({availableSpaces.length}):</Text>
        {availableSpaces.map((x) => (
          <Text key={x._id}>
            {x.name} (id: {x._id})
          </Text>
        ))}
        <Button
          leftIcon={<GrAdd size="24px" />}
          class={css`
            width: 15rem;
          `}
          onClick={() => {
            setNsEditOpen(true)
          }}
        >
          New Space
        </Button>
      </GenericModal>
    </>
  )
}
