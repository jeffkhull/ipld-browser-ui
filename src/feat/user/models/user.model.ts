import { ulid } from 'ulid'

export interface UserModel {
  _id: string
  publicKey: string
  userName: string
  email: string
  firstName: string
  lastName: string
  defaultNamespaceId: string
}

export const blankUser: UserModel = {
  _id: '',
  publicKey: '',
  userName: 'username',
  email: '',
  firstName: 'Your',
  lastName: 'Name',
  defaultNamespaceId: 'default',
}

export class UserResource implements UserModel {
  _id: string
  constructor(
    public publicKey: string,
    public userName: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public defaultNamespaceId: string,
  ) {
    this._id = ulid()
  }
}
