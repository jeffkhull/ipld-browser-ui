import Ajv from 'ajv'
import { JSONSchema7 } from 'json-schema'
import PouchDB from 'pouchdb'

export interface ValidPouchType {
  _id: string
  _rev: string
}

export class Repository<T extends ValidPouchType> {
  private validator: any
  private db: PouchDB.Database
  constructor(schema: JSONSchema7, dbName: string) {
    const ajv = new Ajv()
    this.validator = ajv.compile(schema)
    this.db = new PouchDB(dbName)
  }

  /**
   *
   */
  public async update(item: T) {
    return await this.db.put(item)
  }

  public async get(id: string): Promise<T> {
    return await this.db.get(id)
  }

  public async delete(id: string, rev: string) {
    await this.db.remove(id, rev)
  }
}
