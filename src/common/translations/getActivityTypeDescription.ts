import { UserActivityType } from '../../feat/activity/models/user-activity.model'

export function GetActivityTypeDescription(activityType: UserActivityType) {
  switch (activityType) {
    case UserActivityType.Unassigned:
      return 'NO ACTIVITY'
    case UserActivityType.ViewEntity:
      return 'Viewed'
    case UserActivityType.EditEntity:
      return 'Edited'
    default:
      return 'Error unknown activity type ' + activityType
  }
}
