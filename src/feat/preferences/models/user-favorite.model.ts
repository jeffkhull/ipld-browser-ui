import { ulid } from 'ulid'
import { UserFavoriteType } from './UserFavoriteType'

export interface UserFavorite {
  _id: string
  targetId: string
  type: UserFavoriteType
}

export const blankUserFavorite: UserFavorite = {
  _id: '',
  targetId: '',
  type: UserFavoriteType.Unassigned,
}

export class UserFavoriteResource implements UserFavorite {
  _id: string
  constructor(public targetId: string, public type: UserFavoriteType) {
    this._id = ulid()
  }
}
