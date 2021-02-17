// import { UserAuth, Identity, PrivateKey } from '@textile/hub'
import { Identity, PrivateKey } from '@textile/crypto'
import { generateMetamaskPK } from './MetamaskPKGenerator'

/**
 * Creates a new random keypair-based Identity
 *
 * The identity will be cached in the browser for later
 * sessions.
 */

const AUTH_SOCKET_URL = `ws://localhost:3001/ws/userauth`

export const getIdentity = async (): Promise<PrivateKey> => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  try {
    if (urlParams.get('force')) {
      window.history.replaceState({}, document.title, '/')
      throw new Error('Forced new identity')
    }
    const storedIdent = localStorage.getItem('identity')
    if (storedIdent === null) {
      throw new Error('No identity')
    }
    const restored = PrivateKey.fromString(storedIdent)
    return restored
  } catch (e) {
    /**
     * If any error, create a new identity.
     */
    try {
      //   const identity = await PrivateKey.fromRandom();

      // TODO - figure out, what is this generation function doing??
      const identity = await generateMetamaskPK()
      const identityString = identity.toString()
      localStorage.setItem('identity', identityString)
      return identity
    } catch (err) {
      return err.message
    }
  }
}

/**
 * More secure method for getting token & API auth.
 *
 * Keeps private key locally in the app.
 */
export const loginWithChallenge = (identity: Identity): (() => Promise<any>) => {
  // we pass identity into the function returning function to make it
  // available later in the callback
  return () => {
    return new Promise((resolve, reject) => {
      /**
       * Configured for our development server
       *
       * Note: this should be upgraded to wss for production environments.
       */

      /** Initialize our websocket connection */
      const socket = new WebSocket(AUTH_SOCKET_URL)

      /** Wait for our socket to open successfully */
      socket.onopen = () => {
        /** Get public key string */
        const publicKey = identity.public.toString()

        /** Send a new token request */
        socket.send(
          JSON.stringify({
            pubkey: publicKey,
            type: 'token',
          }),
        )

        /** Listen for messages from the server */
        socket.onmessage = async (event) => {
          const data = JSON.parse(event.data)
          switch (data.type) {
            /** Error never happen :) */
            case 'error': {
              reject(data.value)
              break
            }
            /** The server issued a new challenge */
            case 'challenge': {
              /** Convert the challenge json to a Buffer */
              const buf = Buffer.from(data.value)
              /** User our identity to sign the challenge */
              const signed = await identity.sign(buf)
              /** Send the signed challenge back to the server */
              socket.send(
                JSON.stringify({
                  type: 'challenge',
                  sig: Buffer.from(signed).toJSON(),
                }),
              )
              break
            }
            /** New token generated */
            case 'token': {
              resolve(data.value)
              break
            }
          }
        }
      }
    })
  }
}

/**
 * Method for using the server to create credentials without identity
 */
export const createCredentials = async (): Promise<any> => {
  const response = await fetch(`/api/userauth`, {
    method: 'GET',
  })
  const userAuth: any = await response.json()
  return userAuth
}
