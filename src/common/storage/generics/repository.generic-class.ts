import Ajv from 'ajv'
import { JSONSchema7 } from 'json-schema'
import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
import { NotImplementedException } from '../../exceptions/not-implemented.exception'
PouchDB.plugin(PouchDBFind)

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
  public async upsert(item: T): Promise<T> {
    item._rev = new Date().getTime().toString()
    const res = await this.db.put(item, { schemaValidator: this.validator } as any)
    if (!res.ok) {
      throw new Error(`could not upsert item ${item._id}!`)
    }
    return item
  }

  public async create(item: T): Promise<T> {
    return await this.upsert(item)
  }

  public async findById(id: string): Promise<T> {
    return await this.db.get(id)
  }

  public async deleteById(id: string, rev: string): Promise<void> {
    await this.db.remove(id, rev)
  }

  public async delete(item: T): Promise<void> {
    await this.db.remove(item)
  }

  public async deleteMany(items: T[]): Promise<void> {
    for (const item of items) {
      await this.delete(item)
    }
  }

  public async getAll(): Promise<T[]> {
    const res = await this.db.find()
    return res.docs as T[]
  }

  public async find(filter: any): Promise<T[]> {
    throw new NotImplementedException('')
    // TODO - implement find
    // example     const qry = repoMgr.entRelations.find({ sourceId: { $eq: eid } })
    const res = await this.db.find()
    return res.docs as T[]
  }

  public async count() {
    const info = await this.db.info()
    return info.doc_count
  }
}
