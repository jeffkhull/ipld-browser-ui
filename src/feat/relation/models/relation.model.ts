import { ulid } from 'ulid'

export interface Relation {
  _id: string
  namespaceId: string
  name: string
}

export const blankRelation: Relation = {
  _id: '',
  namespaceId: '',
  name: '',
}

export class RelationResource implements Relation {
  _id: string
  constructor(public namespaceId: string, public name: string) {
    this._id = ulid()
  }
}
