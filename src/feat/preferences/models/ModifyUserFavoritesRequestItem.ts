import { UserFavoriteType } from './UserFavoriteType'

export interface ModifyUserFavoritesRequestItem {
  target_id: string
  type: UserFavoriteType
}
