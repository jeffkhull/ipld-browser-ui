import { ulid } from 'ulid'

export interface EntityRelation {
  _id: string
  relationId: string
  sourceId: string
  targetId: string
}

export enum EntityRelationKeys {
  _id = 'id',
  relationId = 'relationId',
  sourceId = 'sourceId',
  targetId = 'targetId',
}

export const blankEntityRelation: EntityRelation = {
  _id: '',
  relationId: '',
  sourceId: '',
  targetId: '',
}

export class EntityRelationResource implements EntityRelation {
  _id: string
  constructor(public relationId: string, public sourceId: string, public targetId: string) {
    this._id = ulid()
  }
}
