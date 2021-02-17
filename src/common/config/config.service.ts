import { PrivateKey } from '@textile/threaddb'
import { CollectionConfig } from '@textile/threaddb/dist/cjs/remote/grpc'
import { EntityClassCollection } from '../../feat/class/textileSchemas/entity-class.schema'
import { EntityDocCollection } from '../../feat/entity/textileSchemas/entity-document.schema'
import { EntityHeaderCollection } from '../../feat/entity/textileSchemas/entity-header.schema'
import { EntityRelationCollection } from '../../feat/entity/textileSchemas/entity-relation.schema'
import { UserFavoriteCollection } from '../../feat/preferences/textileSchemas/user-favorite.schema'
import { RelationCollection } from '../../feat/relation/textileSchemas/relation.schema'
import { NamespaceCollection } from '../../feat/spaces/textileSchemas/NamespaceSchema'
import { UserCollection } from '../../feat/user/textileSchemas/user.schema'

const privateKey = PrivateKey.fromRandom()
/**
 * Returns everything necessary to drive app config
 * 1. Auth information
 * 2. Database schema and version information
 */
export class ConfigService {
  static get textileHubKey() {
    // return 'bn6zcf5mzp4mgdcgrulueviflry'
    return localStorage.getItem('textile_hub_key') || ''
  }

  static setTextileHubKey(appKey: string) {
    localStorage.setItem('textile_hub_key', appKey)
  }

  static get userPrivateKey(): PrivateKey {
    return privateKey
  }

  static get DatabaseName() {
    return 'ipld-browser'
  }

  static get DatabaseVersion() {
    return 1
  }

  static get DatabaseCollections(): CollectionConfig[] {
    return [
      EntityClassCollection,
      EntityDocCollection,
      EntityHeaderCollection,
      EntityRelationCollection,
      NamespaceCollection,
      RelationCollection,
      UserCollection,
      UserFavoriteCollection,
    ]
  }
}
