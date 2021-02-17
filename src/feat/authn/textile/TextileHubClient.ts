// import { Client, CollectionConfig, PrivateKey, ThreadID } from '@textile/crypto'
import { PrivateKey } from '@textile/crypto'
import { Client, ThreadID, Collection, JSONSchema } from '@textile/threaddb'
import * as pb from '@textile/threads-client-grpc/threads_pb'
import { NotImplementedException } from '../../../common/exceptions/not-implemented.exception'
import { getIdentity, loginWithChallenge } from './HubClientUtils'

/**
 * Hub client API https://textileio.github.io/js-hub/docs/hub.client
 * Threads DB docs https://docs.textile.io/threads/
 *
 * Invite¶
 * You can invite multiple users to the same thread. Use this to build chat apps, collaborative documents and more.
 */
export class TextileHubClient {
  /** The users unique pki identity */
  id?: PrivateKey

  /** The Hub API authentication */
  private _client?: Client
  private _threadId?: any

  constructor() {}

  public get client(): Client {
    if (this._client == null) {
      throw new Error('Client not authenticated!')
    }

    return this._client
  }

  get clientConnected() {
    return this._client != null
  }

  get isThreadConnected() {
    return this._threadId != null
  }

  public get threadId(): ThreadID {
    if (!this._threadId) throw new Error('Thread ID not initialized')
    return this._threadId
  }

  sign = async (buf: Buffer) => {
    if (!this.id) {
      throw Error('No user ID found')
    }
    return this.id.sign(buf)
  }
  /**
   * Returns the public key (user id) for the identity
   */
  setupIdentity = async (): Promise<string> => {
    /** Create or get identity */
    this.id = await getIdentity()
    /** Contains the full identity (including private key) */
    const identity = this.id.public.toString()

    /** Get the public key */
    const publicKey = this.id.public.toString()

    /** Display the publicKey short ID */
    return publicKey
  }

  initDb = async () => {
    throw new NotImplementedException('Method')
    // const extDbs = await this.client.listThreads()
    // const wantedThread = extDbs.filter((x) => x.name === THREADS_DB_NAME)[0] ?? null

    // if (wantedThread != null) {
    //   this._threadId = ThreadID.fromString(wantedThread.id)
    //   return
    // }

    // console.log(`Database not found.  Creating...`)
    // this._threadId = await this.client.newDB(undefined, THREADS_DB_NAME)
  }

  // get new release of hub per https://github.com/textileio/js-threads/issues/522#issuecomment-688005054
  public listCollections = async () => {
    const col = await this.client.listCollections(this.threadId)
    return col
  }

  /**
   * follow this issue for indexing: https://github.com/textileio/js-threads/issues/34
   */
  public createCollection = async (
    collectionName: string,
    schema: JSONSchema,
    indexes?: pb.Index.AsObject[],
  ) => {
    throw new NotImplementedException('Method')
    // const collConfig: Collection = {
    //   name: collectionName,
    //   schema: schema,
    //   indexes: indexes,
    // }

    // await this.client.newCollection(this.threadId, collConfig)
  }

  /**
   * follow this issue for indexing: https://github.com/textileio/js-threads/issues/34
   */
  public updateCollection = async (
    collectionName: string,
    schema: JSONSchema,
    indexes?: pb.Index.AsObject[],
  ) => {
    throw new NotImplementedException('Method')
    // const collConfig: CollectionConfig = {
    //   name: collectionName,
    //   schema: schema,
    //   indexes: indexes,
    // }

    // await this.client.updateCollection(this.threadId, collConfig)
  }

  public deleteCollection = async (collectionName: string) => {
    await this.client.deleteCollection(this.threadId, collectionName)
  }

  /**
   * Provides a full login where
   * - pubkey is shared with the server
   * - identity challenge is fulfilled here, on client
   * - hub api token is sent from the server
   *
   * see index.html for example running this method
   *
   * Note: this function is not awaitable.  Must test _client non-null before using client.
   */
  startLogin = () => {
    if (!this.id) {
      throw Error('No user ID found')
    }

    /** Use the identity to request a new API token when needed */
    const loginCallback = loginWithChallenge(this.id)
    this._client = Client.withUserAuth(loginCallback)
  }
}
