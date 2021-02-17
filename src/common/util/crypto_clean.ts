/**
 * Main demo function - execute this to see the web crypto API in action
 */
export async function cryptoDemo(): Promise<void> {
  const key = await createNewKey()

  // Encrypt a string
  const plainString = 'my secret data'
  const plainBuffer = utf8StringToBuffer(plainString)
  const encryptedBuffer = await encryptBuffer(key, plainBuffer)
  const cipherTextAsString = binaryBufferToString(encryptedBuffer)

  // Go the other direction - Decrypt the string
  const cipherTextAsBuffer = binaryStringToBuffer(cipherTextAsString)
  const plainBuffer2 = await decryptBuffer(key, cipherTextAsBuffer)
  const decryptedString = utf8BufferToString(plainBuffer2)

  console.log(`string after decryption: ${decryptedString}`)
}

async function createNewKey(): Promise<CryptoKey> {
  return await window.crypto.subtle.generateKey(
    {
      name: 'AES-CTR',
      length: 256, //can be  128, 192, or 256
    },
    false, //whether the key is extractable (i.e. can be used in exportKey)
    ['encrypt', 'decrypt'], //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
  )
}

export async function decryptString(key: CryptoKey, encString: string): Promise<string> {
  const encBuffer = utf8StringToBuffer(encString)
  const plainBuffer = await decryptBuffer(key, encBuffer)
  return utf8BufferToString(plainBuffer)
}

async function encryptBuffer(key: CryptoKey, plainBuffer: ArrayBuffer): Promise<ArrayBuffer> {
  const encBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'AES-CTR',
      //Don't re-use initialization vectors!
      //Always generate a new iv every time your encrypt!
      counter: new Uint8Array(16),
      length: 128,
    },
    key, //from generateKey or importKey above
    plainBuffer, //ArrayBuffer of data you want to encrypt
  )
  return encBuffer
}

export async function decryptBuffer(key: CryptoKey, encBuffer: ArrayBuffer): Promise<ArrayBuffer> {
  const plainBuffer = await window.crypto.subtle.decrypt(
    {
      name: 'AES-CTR',
      //Don't re-use initialization vectors!
      //Always generate a new iv every time your encrypt!
      counter: new Uint8Array(16),
      length: 128,
    },
    key,
    encBuffer,
  )
  return plainBuffer
}

function utf8StringToBuffer(input: string): ArrayBuffer {
  const encoder = new TextEncoder()
  return encoder.encode(input)
}

function utf8BufferToString(input: ArrayBuffer): string {
  const decoder = new TextDecoder()
  return decoder.decode(input)
}

function binaryBufferToString(input: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
}

// https://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer
function binaryStringToBuffer(input: string): ArrayBuffer {
  return Uint8Array.from(atob(input), (c) => c.charCodeAt(0))
}
