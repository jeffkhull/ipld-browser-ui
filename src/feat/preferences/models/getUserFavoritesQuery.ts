import { UserFavorite } from './user-favorite.model'
import { UserFavoriteType } from './UserFavoriteType'

export interface GetUserFavoritesRequest {
  UserFavoriteTypes: UserFavoriteType[]
  TargetIdList: string[]
}

export interface GetUserFavoritesResponse {
  UserFavorites: UserFavorite[]
}
