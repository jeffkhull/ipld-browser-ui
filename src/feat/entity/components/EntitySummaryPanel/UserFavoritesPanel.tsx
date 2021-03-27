import { Box, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { UserFavoritesItem } from './UserFavoritesItem'
import { widget33 } from '../styles'
import { userStoreSelectors, useUserStore } from '../../../user/stores/UserStore'
import { UserFavoriteReadable } from '../../../preferences/models/UserFavoriteReadable'
import { UserFavoritesService } from '../../../preferences/services/user-favorites.service'

export function UserFavoritesPanel() {
  const user = useUserStore(userStoreSelectors.user)
  const [userFavorites, setUserFavorites] = React.useState<UserFavoriteReadable[]>([])

  useEffect(() => {
    void hydrateFavorites()
  }, [user._id])

  const hydrateFavorites = React.useCallback(async () => {
    const favs = await UserFavoritesService.getAllReadable()
    setUserFavorites(favs)
  }, [])

  return (
    <Box className={widget33} bgColor="gray.50">
      <Heading size="lg">Favorites</Heading>
      {userFavorites.map((fav) => {
        return <UserFavoritesItem key={fav._id} item={fav} />
      })}
    </Box>
  )
}
