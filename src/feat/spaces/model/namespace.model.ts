import { ulid } from 'ulid'

export interface Namespace {
  _id: string
  name: string
  owningUser: string
}

export const blankNamespace: Namespace = {
  _id: '',
  name: '',
  owningUser: '',
}

export class NamespaceResource implements Namespace {
  _id: string

  constructor(public name: string, public owningUser = '') {
    this._id = ulid()
  }
}
