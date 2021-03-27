import { Collection, Database } from '@textile/threaddb'
import { CollectionConfig } from '@textile/threaddb/dist/cjs/remote/grpc'

import { EntityClass } from '../../../feat/class/models/entity-class.model'
import { EntityClassSchema } from '../../../feat/class/textileSchemas/entity-class.schema'
import { EntityDocument } from '../../../feat/entity/model/entity-document.model'
import { EntityHeader } from '../../../feat/entity/model/entity-header.model'
import { EntityDocumentSchema } from '../../../feat/entity/textileSchemas/entity-document.schema'
import { EntityHeaderSchema } from '../../../feat/entity/textileSchemas/entity-header.schema'
import { EntityRelationSchema } from '../../../feat/entity/textileSchemas/entity-relation.schema'
import { EntityRelation } from '../../../feat/entity_relation/model/entity-relation.model'
import { UserFavorite } from '../../../feat/preferences/models/user-favorite.model'
import { UserFavoriteSchema } from '../../../feat/preferences/textileSchemas/user-favorite.schema'
import { Relation } from '../../../feat/relation/models/relation.model'
import { RelationSchema } from '../../../feat/relation/textileSchemas/relation.schema'
import { SearchService } from '../../../feat/search/services/search.service'
import { Namespace } from '../../../feat/spaces/model/namespace.model'
import { NamespaceSchema } from '../../../feat/spaces/textileSchemas/NamespaceSchema'
import { UserModel } from '../../../feat/user/models/user.model'
import { UserSchema } from '../../../feat/user/textileSchemas/user.schema'
import { ConfigService } from '../../config/config.service'
import { NotImplementedException } from '../../exceptions/not-implemented.exception'
import { sleep } from '../../util/sleep'
import { TextileCollectionNames } from '../enums/TextileCollection'

export interface RepoConfigOptions {
  localOnly?: boolean
}

export class RepoService {
  public db: Database
  private _users?: Collection<UserModel>
  private _entHeaders?: Collection<EntityHeader>
  private _entRelations?: Collection<EntityRelation>
  private _classes?: Collection<EntityClass>
  private _relations?: Collection<Relation>
  private _entDocuments?: Collection<EntityDocument>
  private _namespaces?: Collection<Namespace>
  private _userFavorites?: Collection<UserFavorite>
  private _initialized = false

  // private collectionSchema: Map<string, JSONSchema> = new Map()

  constructor() {
    // Initialize collections
    const coll: CollectionConfig[] = []
    coll.push({ name: 'EntityHeader', schema: EntityHeaderSchema })
    coll.push({ name: 'User', schema: UserSchema })
    coll.push({ name: 'EntityClass', schema: EntityClassSchema })
    coll.push({ name: 'EntityDocument', schema: EntityDocumentSchema })
    coll.push({ name: 'EntityRelation', schema: EntityRelationSchema })
    coll.push({ name: 'Namespace', schema: NamespaceSchema })
    coll.push({ name: 'Relation', schema: RelationSchema })
    coll.push({ name: 'UserFavorite', schema: UserFavoriteSchema })
    try {
      this.db = new Database(ConfigService.DatabaseName, ...(coll as any))
    } catch (err) {
      console.error(`Error initializing collections!`, err)
      throw err
    }
    console.error(`Successfully initialized collections`)
  }

  public init = async (options: RepoConfigOptions = {}) => {
    try {
      await this.db.open(ConfigService.DatabaseVersion)
    } catch (err) {
      console.error(`Error init database`, err)
      throw err
    }

    // Only authenticate if we have not opted out of remote for testing
    if (options.localOnly != null && options.localOnly !== true) await this.authenticate()

    this._initialized = true
  }

  public initSearchIndex = async () => {
    await SearchService.initEntityHeaderCache()
  }

  public get isInitialized(): boolean {
    return this._initialized
  }

  /**
   * Sleep until db is ready
   */
  public awaitInitialized = async (maxWaitMs = 5000) => {
    if (this.isInitialized) return
    const msWaitIntervalMs = 50
    const tries = Math.floor(maxWaitMs / msWaitIntervalMs)
    for (let i = 0; i < tries; i++) {
      await sleep(msWaitIntervalMs)
      if (this.isInitialized) return
    }

    throw new Error('Timed out waiting for repo manager to initialize')
  }

  public authenticate = async () => {
    console.log(`Authenticating with textile`)
    const remote = await this.db.remote.setKeyInfo({ key: ConfigService.textileHubKey })
    await remote.authorize(
      ConfigService.userPrivateKey.public.toString(),
      (challengeMsg: Uint8Array) => {
        return ConfigService.userPrivateKey.sign(challengeMsg)
      },
    )
    // const config = remote.config.metadata
    remote.config?.metadata?.set('x-textile-thread-name', this.db.dexie.name)
    remote.config?.metadata?.set('x-textile-thread', this.db.id || '')
  }

  public dispose = () => {
    this.db.close()
  }

  public get entHeaders(): Collection<EntityHeader> {
    if (this._entHeaders == null) {
      this._entHeaders = this.db.collection(
        TextileCollectionNames.EntityHeader,
      ) as Collection<EntityHeader>
    }
    return this._entHeaders
  }

  public get userFavorites(): Collection<UserFavorite> {
    if (this._userFavorites == null) {
      this._userFavorites = this.db.collection(
        TextileCollectionNames.UserFavorite,
      ) as Collection<UserFavorite>
    }
    return this._userFavorites
  }
  public get entRelations(): Collection<EntityRelation> {
    if (this._entRelations == null) {
      this._entRelations = this.db.collection(
        TextileCollectionNames.EntityRelation,
      ) as Collection<EntityRelation>
    }
    return this._entRelations
  }
  public get classes(): Collection<EntityClass> {
    if (this._classes == null) {
      this._classes = this.db.collection(
        TextileCollectionNames.EntityClass,
      ) as Collection<EntityClass>
    }
    return this._classes
  }
  public get relations(): Collection<Relation> {
    if (this._relations == null) {
      this._relations = this.db.collection(TextileCollectionNames.Relation) as Collection<Relation>
    }
    return this._relations
  }
  public get entDocuments(): Collection<EntityDocument> {
    if (this._entDocuments == null) {
      this._entDocuments = this.db.collection(
        TextileCollectionNames.EntityDocument,
      ) as Collection<EntityDocument>
    }
    return this._entDocuments
  }
  public get namespaces(): Collection<Namespace> {
    if (this._namespaces == null) {
      this._namespaces = this.db.collection(
        TextileCollectionNames.Namespace,
      ) as Collection<Namespace>
    }
    return this._namespaces
  }

  public get users(): Collection<UserModel> {
    if (this._users == null) {
      this._users = this.db.collection(TextileCollectionNames.User) as Collection<UserModel>
    }
    return this._users
  }

  public initCollections = async () => {
    throw new NotImplementedException('Method')
    // const col = await this.getExistingCollections()
    // const existingCol = col.map((x) => x.name)
    // // TODO - figure out how to convert schema object to comparable string to determine if we need to update or not
    // // Note: may just need to put this off until js-threaddb is ready
    // // const colSchemaMap = new Map<string, string>()
    // // col.forEach((x) => {
    // //   console.log(`${typeof x.schema}. value is ${x.schema}`)
    // //   colSchemaMap.set(x.name, x.schema as string)
    // // })

    // for (const item of this.collectionSchema) {
    //   const colName = item[0]
    //   const schema = item[1]

    //   if (!existingCol.includes(colName)) {
    //     console.log(`${colName} collection does not exist.  Creating.`)
    //     await txClient.createCollection(colName, schema)
    //   } else {
    //     // TODO - see if there is a way to checkif update is needed before I actually do the update.
    //     // console.log(`${colName} collection exists.  Updating.`)
    //     // await txClient.updateCollection(colName, schema)
    //   }
    // }
  }

  public getExistingCollections = async () => {
    throw new NotImplementedException('Method')
  }
}

export const repoMgr = new RepoService()

export async function initRepoService(): Promise<void> {
  await repoMgr.init({ localOnly: true })
}
