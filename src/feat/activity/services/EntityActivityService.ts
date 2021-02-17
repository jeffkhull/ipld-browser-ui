import { EntityHeader } from '../../entity/model/entity-header.model'
import { UserActivityModel, UserActivityType } from '../models/user-activity.model'

export class EntityActivityService {
  /**
   * Temporary function that will convert a list of entities into activities for display on the activity panel
   */
  static getEntityActivities = (headers: EntityHeader[]): UserActivityModel[] => {
    const activities: UserActivityModel[] = []
    headers.forEach((header) => {
      activities.push({
        _id: '',
        userId: '',
        targetId: header._id,
        type: UserActivityType.EditEntity,
        activityTime: '...',
      })
    })
    return activities
  }
}
