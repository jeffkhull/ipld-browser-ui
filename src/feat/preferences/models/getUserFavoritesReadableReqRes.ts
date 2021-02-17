import { UserFavoriteReadable } from './UserFavoriteReadable'
import { UserFavoriteType } from './UserFavoriteType'
export interface GetUserFavoritesReadableRequest {
  Types: UserFavoriteType[]
  MaxCount: number
}

export interface GetUserFavoritesReadableResponse {
  UserFavorites: UserFavoriteReadable[]
}
