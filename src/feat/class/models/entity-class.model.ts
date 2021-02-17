import { ulid } from 'ulid'

export interface EntityClass {
  _id: string
  namespaceId: string
  name: string
}

export const blankEntityClass: EntityClass = {
  _id: '',
  namespaceId: '',
  name: '',
}

export class EntityClassResource implements EntityClass {
  _id: string
  constructor(public name: string, public namespaceId: string) {
    this._id = ulid()
  }
}
