import { UserFavoriteType } from '../../feat/preferences/models/UserFavoriteType'

export function GetActivityTypeDescription(activityType: UserFavoriteType) {
  switch (activityType) {
    case UserFavoriteType.Unassigned:
      return 'NO TYPE'
    case UserFavoriteType.Entity:
      return 'Entity'
    default:
      return 'Error unknown activity type ' + activityType
  }
}
