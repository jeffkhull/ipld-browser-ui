import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { navigateWithCtrlSensitivity } from '../../../../common/util/navigate'
import { UserFavoriteReadable } from '../../../preferences/models/UserFavoriteReadable'

export interface UserFavoritesItemProps {
  item: UserFavoriteReadable
}

export function UserFavoritesItem(props: UserFavoritesItemProps) {
  return (
    <Box marginTop="10px">
      <Button
        variant="link"
        fontSize="1.5rem"
        marginBottom="5px"
        color="purple"
        onClick={(e) => {
          navigateWithCtrlSensitivity(`/item/${props.item.targetId}`, e)
        }}
      >
        {props.item.name}
      </Button>
      <Text style={{ marginRight: '20px' }}>{props.item.name}</Text>
    </Box>
  )
}
