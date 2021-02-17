import { css } from 'emotion'
import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { StringIndexable } from '../../../indexes/models/StringIndexable'
import { NotImplementedException } from '../../../../common/exceptions/not-implemented.exception'
import { navigateWithCtrlSensitivity } from '../../../../common/util/navigate'

export interface RecentActivityItemProps {
  item: StringIndexable
}

export function EntityLinkItem(props: RecentActivityItemProps) {
  const [title, setTitle] = React.useState('')
  const getTitle = React.useCallback(async (item: StringIndexable) => {
    throw new NotImplementedException('Method')
    // const classId = item.classId

    // const entityClass = await IxSearch.getItemByIdFromIndexedDb(
    //   IxSearch.IndexedItemType.CLASS,
    //   classId,
    // )

    // let className = ''
    // if (entityClass != null && entityClass.value != null) className = ' (' + entityClass.value + ')'

    // if (item.isDeprecated === 0) {
    //   setTitle(item.value + className)
    // } else {
    //   setTitle(item.value + className + ' (deprecated)')
    // }
  }, [])

  React.useEffect(() => {
    void getTitle(props.item)
  }, [props.item.id])

  return (
    <Box
      className={css`
        margin-top: 10px;
      `}
    >
      <Button
        style={{ display: 'block', fontSize: '24px', marginBottom: '5px' }}
        color="purple"
        onClick={(e) => {
          navigateWithCtrlSensitivity(`/item/${props.item.id}`, e)
        }}
      >
        {title}
      </Button>
    </Box>
  )
}
