import { css } from 'emotion'
import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { StringIndexable } from '../../../indexes/models/StringIndexable'
import { NotImplementedException } from '../../../../common/exceptions/not-implemented.exception'
import { navigateWithCtrlSensitivity } from '../../../../common/util/navigate'
import { EntityClassService } from '../../../class/services/entity-class.service'

export interface RecentActivityItemProps {
  item: StringIndexable
}

export function EntityLinkItem(props: RecentActivityItemProps) {
  const [title, setTitle] = React.useState('')
  const getTitle = React.useCallback(async (item: StringIndexable) => {
    const entityClass = await EntityClassService.getEntityClass(item.classId)

    let className = ''
    if (entityClass?.name != null && entityClass?.name !== '')
      className = ' (' + entityClass.name + ')'

    if (item.isDeprecated !== true) {
      setTitle(item.value + className)
    } else {
      setTitle(item.value + className + ' (deprecated)')
    }
  }, [])

  React.useEffect(() => {
    void getTitle(props.item)
  }, [props.item.id])

  return (
    <Button
      width="100%"
      textAlign="left"
      variant="ghost"
      style={{ display: 'block', fontSize: '24px' }}
      color="purple"
      onClick={(e) => {
        navigateWithCtrlSensitivity(`/item/${props.item.id}`, e)
      }}
    >
      {title}
    </Button>
  )
}
