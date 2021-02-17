import { Heading } from '@chakra-ui/react'
import { css } from 'emotion'
import React from 'react'
import { EntityRelationOneSide } from '../../../entity_relation/model/EntityRelationOneSide'
import { EntityRelationService } from '../../../entity_relation/services/entity-relation.service'

import { InboundRelationDisplay } from './EntityRightContextMenu/InboundRelationDisplay'
import { OutboundRelationDisplay } from './EntityRightContextMenu/OutboundRelationDisplay'

export interface EntityRightContextMenuProps {
  entityId: string
  // TODO - figure out modification props from db
  entityModificationProps: any
  setOutboundRelationCreateOpen: (isOpen: boolean) => void
}

export function EntityRightContextItems(props: EntityRightContextMenuProps) {
  const [inboundRelations, setInboundRelations] = React.useState<EntityRelationOneSide[]>([])

  React.useEffect(() => {
    if (props.entityId == null || props.entityId === '') {
      return
    }
    void hydrateInboundRel(props.entityId)
  }, [props.entityId])

  const hydrateInboundRel = React.useCallback(async (eid: string) => {
    // const inboundRel = await serverApi.getInboundForEntity(entityId)
    const inboundRel = await EntityRelationService.getInboundRelationsReadable(eid)
    setInboundRelations(inboundRel)
  }, [])

  return (
    <>
      <Heading
        size="lg"
        margin="none"
        className={css`
          margin-top: 10px;
          margin-bottom: 25px;
          font-style: italic;
        `}
      >
        Item Facts
      </Heading>
      <OutboundRelationDisplay entityId={props.entityId} />
      <InboundRelationDisplay entityId={props.entityId} />
      {/* <Heading
        margin="none"
        level={3}
        className={css`
          margin-top: 15px;
        `}
      >
        Other
      </Heading>
      {props.entityModificationProps.created_at && (
        <Text key="created">Created: {Dates.getRelativeReadableDate(props.entityModificationProps.created_at)} </Text>
      )}
      {props.entityModificationProps.updated_at && (
        <Text key="modified">Modified: {Dates.getRelativeReadableDate(props.entityModificationProps.updated_at)} </Text>
      )} */}
    </>
  )
}
