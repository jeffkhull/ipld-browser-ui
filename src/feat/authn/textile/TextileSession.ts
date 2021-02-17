import { sleep } from '../../../common/util/sleep'
import { TextileHubClient } from './TextileHubClient'

export const txClient = new TextileHubClient()

async function awaitTxClientInitialization(): Promise<void> {
  for (let i = 0; i < 50; i++) {
    if (txClient.clientConnected) {
      return
    }

    await sleep(100)
  }
  throw new Error('Timed out awaiting textile client connection!')
}

export async function textileReady(): Promise<void> {
  for (let i = 0; i < 50; i++) {
    if (txClient.isThreadConnected) {
      return
    }

    await sleep(100)
  }
  throw new Error('Timed out awaiting textile client connection!')
}

/**
 * Do login and return identity public key
 */
export async function doTextileLogin(): Promise<string> {
  const publicKey = await txClient.setupIdentity()
  txClient.startLogin()
  await awaitTxClientInitialization()
  await txClient.initDb()

  return publicKey
}
