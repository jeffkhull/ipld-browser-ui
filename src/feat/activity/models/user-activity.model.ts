import { ulid } from 'ulid'

export interface UserActivityModel {
  _id: string
  userId: string
  targetId: string
  type: UserActivityType
  activityTime: string
}

export class UserActivityModelResource implements UserActivityModel {
  _id: string
  constructor(
    public userId: string,
    public targetId: string,
    public type: UserActivityType,
    public activityTime: string,
  ) {
    this._id = ulid()
  }
}

export interface UserActivityReadable {
  model: UserActivityModel
  userFullName: string
  targetName: string
}

export enum UserActivityType {
  Unassigned = -1,
  ViewEntity = 1,
  EditEntity = 2,
}
