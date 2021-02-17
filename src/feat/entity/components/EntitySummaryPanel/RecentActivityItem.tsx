import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { NotImplementedException } from '../../../../common/exceptions/not-implemented.exception'
import { GetActivityTypeDescription } from '../../../../common/translations/getActivityTypeDescription'
import { getRelativeReadableDate } from '../../../../common/util/dates'
import { navigateWithCtrlSensitivity } from '../../../../common/util/navigate'
import { UserActivityModel, UserActivityType } from '../../../activity/models/user-activity.model'

export interface RecentActivityItemProps {
  item: UserActivityModel
}

export function RecentActivityItem(props: RecentActivityItemProps) {
  const [title, setTitle] = React.useState('')
  const getTitle = React.useCallback(async (id: string) => {
    throw new NotImplementedException('Method')

    if (
      props.item.type === UserActivityType.EditEntity ||
      props.item.type === UserActivityType.ViewEntity
    ) {
      //   const entity = await IxSearch.getItemByIdFromIndexedDb(
      //     IndexedItemType.ENTITY,
      //     props.item.target_id,
      //   )
      //   if (entity == null) {
      //     console.log(`could not find entity for target_id `, props.item.target_id)
      //     return `IxErr: ${props.item.target_id}`
      //   }
      //   const classId = entity.classId
      //   const entityClass = await IxSearch.getItemByIdFromIndexedDb(
      //     IxSearch.IndexedItemType.CLASS,
      //     classId,
      //   )
      //   let className = ''
      //   if (entityClass != null && entityClass.value != null)
      //     className = ' (' + entityClass.value + ')'
      //   if (entity.isDeprecated === 0) {
      //     setTitle(entity.value + className)
      //   } else {
      //     setTitle(entity.value + className + ' (deprecated)')
      // }
    }
  }, [])

  React.useEffect(() => {
    void getTitle(props.item?.targetId)
  }, [props.item?.targetId])

  return (
    <Box marginTop="10px">
      <Button
        variant="link"
        marginBottom="5px"
        fontSize="1.5rem"
        color="purple"
        onClick={(e) => {
          navigateWithCtrlSensitivity(`/item/${props.item.targetId}`, e)
        }}
      >
        {title}
      </Button>
      <Text style={{ marginRight: '20px' }}>
        {GetActivityTypeDescription(props.item.type)} By _{' '}
        {getRelativeReadableDate(props.item.activityTime)}
      </Text>
    </Box>
  )
}
