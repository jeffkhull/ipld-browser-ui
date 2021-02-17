import { ulid } from 'ulid'

export interface EntityHeader {
  _id: string
  namespaceId: string
  name: string
  classId: string
  isDeprecated: boolean
  replacedBy: string
}

export const blankEntityHeader: EntityHeader = {
  _id: '',
  namespaceId: '',
  name: '',
  classId: '',
  isDeprecated: false,
  replacedBy: '',
}

export class EntityHeaderResource implements EntityHeader {
  _id: string

  constructor(
    public namespaceId: string,
    public name: string,
    public classId = '',
    public isDeprecated = false,
    public replacedBy = '',
  ) {
    this._id = ulid()
  }
}
