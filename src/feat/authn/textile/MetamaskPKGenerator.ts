import React from 'react'
// @ts-ignore
import { dispatchCustomEvent, ButtonPrimary, GlobalNotification, Input } from 'slate-react-system'
import { PrivateKey } from '@textile/crypto'
import { BigNumber, providers, utils } from 'ethers'
import { hashSync } from 'bcryptjs'

/**
 * Metamask signing and seed generation adapted from pnlp project. See sources here,
 * https://github.com/pnlp-network/pnlp/blob/91540abea8b51231c2f1e2fe8cc03b7604842d03/pnlp-app/src/app/%40core/persistence/blockchain.service.ts
 * https://github.com/pnlp-network/pnlp/blob/91540abea8b51231c2f1e2fe8cc03b7604842d03/pnlp-app/src/app/%40core/persistence/keystore.service.ts
 */

type WindowInstanceWithEthereum = Window &
  typeof globalThis & { ethereum?: providers.ExternalProvider }
class StrongType<Definition, Type> {
  // @ts-ignore
  private _type: Definition
  constructor(public value?: Type) {}
}
export class EthereumAddress extends StrongType<'ethereum_address', string> {}

const SECRET = 'secret1234'

export function generateMessageForEntropy(
  ethereum_address: EthereumAddress,
  application_name: string,
  secret: string,
): string {
  return (
    '******************************************************************************** \n' +
    'READ THIS MESSAGE CAREFULLY. \n' +
    'DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND WRITE \n' +
    'ACCESS TO THIS APPLICATION. \n' +
    'DO NOT SIGN THIS MESSAGE IF THE FOLLOWING IS NOT TRUE OR YOU DO NOT CONSENT \n' +
    'TO THE CURRENT APPLICATION HAVING ACCESS TO THE FOLLOWING APPLICATION. \n' +
    '******************************************************************************** \n' +
    'The Ethereum address used by this application is: \n' +
    '\n' +
    ethereum_address.value +
    '\n' +
    '\n' +
    '\n' +
    'By signing this message, you authorize the current application to use the \n' +
    'following app associated with the above address: \n' +
    '\n' +
    application_name +
    '\n' +
    '\n' +
    '\n' +
    'The hash of your non-recoverable, private, non-persisted password or secret \n' +
    'phrase is: \n' +
    '\n' +
    secret +
    '\n' +
    '\n' +
    '\n' +
    '******************************************************************************** \n' +
    'ONLY SIGN THIS MESSAGE IF YOU CONSENT TO THE CURRENT PAGE ACCESSING THE KEYS \n' +
    'ASSOCIATED WITH THE ABOVE ADDRESS AND APPLICATION. \n' +
    'AGAIN, DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND \n' +
    'WRITE ACCESS TO THIS APPLICATION. \n' +
    '******************************************************************************** \n'
  )
}

async function getSigner() {
  if (!(window as WindowInstanceWithEthereum).ethereum) {
    throw new Error(
      'Ethereum is not connected. Please download Metamask from https://metamask.io/download.html',
    )
  }

  console.debug('Initializing web3 provider...')
  // @ts-ignore
  const provider = new providers.Web3Provider((window as WindowInstanceWithEthereum).ethereum)
  const signer = provider.getSigner()
  return signer
}

async function getAddressAndSigner(): Promise<{ address: EthereumAddress; signer: any }> {
  // TODO - put menu somewhere so user can choose which account they want to use to access the app.
  const signer = await getSigner()
  // @ts-ignore
  const accounts = await (window as WindowInstanceWithEthereum).ethereum.request({
    method: 'eth_requestAccounts',
  })
  if (accounts.length === 0) {
    throw new Error('No account is provided. Please provide an account to this application.')
  }

  const address = new EthereumAddress(accounts[0])

  return { address, signer }
}
export async function generateMetamaskPK(): Promise<PrivateKey> {
  const metamask = await getAddressAndSigner()

  console.log(`metamask information: `, metamask)
  // avoid sending the raw secret by hashing it first
  localStorage.setItem('eth address', metamask.address.value ?? '')
  localStorage.setItem('metamask signer', JSON.stringify(metamask.signer))

  //   const secret = hashSync(SECRET, 10)

  // TODO - resolve issue with bcrypt...why does hashSync return a different result every time??
  const secret = SECRET
  localStorage.setItem('hash secret', secret)
  const message = generateMessageForEntropy(metamask.address, 'textile-demo', secret)
  //   const message = 'constant message'

  const signedText = await metamask.signer.signMessage(message)

  localStorage.setItem('signedText', signedText)

  const hash = utils.keccak256(signedText)
  if (hash === null) {
    throw new Error('No account is provided. Please provide an account to this application.')
  }
  localStorage.setItem('hash', signedText)
  // The following line converts the hash in hex to an array of 32 integers.
  // @ts-ignore
  const array = hash
    // @ts-ignore
    .replace('0x', '')
    // @ts-ignore
    .match(/.{2}/g)
    .map((hexNoPrefix) => BigNumber.from('0x' + hexNoPrefix).toNumber())

  if (array.length !== 32) {
    throw new Error('Hash of signature is not the correct size! Something went wrong!')
  }
  const identity = PrivateKey.fromRawEd25519Seed(Uint8Array.from(array))
  console.log(identity.toString())

  createNotification(identity)

  // Your app can now use this identity for generating a user Mailbox, Threads, Buckets, etc
  return identity
}

function createNotification(identity: PrivateKey) {
  console.log(
    `PubKey: ${identity.public.toString()}. Your app can now generate and reuse this users PrivateKey for creating user Mailboxes, Threads, and Buckets.`,
  )
  //   dispatchCustomEvent({
  //     name: "create-notification",
  //     detail: {
  //       id: 1,
  //       description: `PubKey: ${identity.public.toString()}. Your app can now generate and reuse this users PrivateKey for creating user Mailboxes, Threads, and Buckets.`,
  //       timeout: 5000,
  //     },
  //   });
}
