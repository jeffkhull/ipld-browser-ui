export async function cryptoDemo(): Promise<void> {
  let key = await getKey()
  //   let key = null;
  console.log(`previous key: `, key)

  if (key == null) {
    key = await createNewKey()
    await saveKey(key)
  }

  const plainString = 'my secret data'

  console.log(`before all: ${plainString}`)

  const plainBuffer = utf8StringToBuffer(plainString)
  const encBuffer = await encryptBuffer(key, plainBuffer)

  //   let encBufferBase64 = btoa(String.fromCharCode(...new Uint8Array(encBuffer)));
  //   console.log(`enc buffer base64: ${encBufferBase64}`);
  //   let encBufferFromBase64 = atob(encBufferBase64)

  // text encoder and decoder works fine with plaintext... BUT not with encrypted text.
  // TODO - figure out what encoding to use for random bytes. https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder
  // helpful article https://stackoverflow.com/questions/51371648/converting-from-a-uint8array-to-a-string-and-back
  // DO THIS - use base64 (duh)

  const encString = binaryBufferToString(encBuffer)
  const encBuffer2 = binaryStringToBuffer(encString)

  const plainBuffer2 = await decryptBuffer(key, encBuffer2)
  const plainString2 = utf8BufferToString(plainBuffer2)
  //   const encString = await encryptString(key, plainString);
  //   const plainString2 = await decryptString(key, encString);

  console.log(`after all: ${plainString2}`)
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

export async function encryptString(key: CryptoKey, plainString: string): Promise<string> {
  const plainBuffer = utf8StringToBuffer(plainString)
  const encBuffer = await encryptBuffer(key, plainBuffer)

  return utf8BufferToString(encBuffer)
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

// https://gist.github.com/saulshanabrook/b74984677bccd08b028b30d9968623f5
function callOnStore(fn_: (store: IDBObjectStore) => void): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
    const indexedDB = window.indexedDB

    // Open (or create) the database
    const open = indexedDB.open('MasterKeyDatabase', 1)

    // Create the schema
    open.onupgradeneeded = function () {
      const db = open.result
      const store = db.createObjectStore('MasterKeyStore', { keyPath: 'id' })
    }

    open.onsuccess = function () {
      // Start a new transaction
      const db = open.result
      const tx = db.transaction('MasterKeyStore', 'readwrite')
      const store = tx.objectStore('MasterKeyStore')

      fn_(store)

      // Close the db when the transaction is done
      tx.oncomplete = function () {
        db.close()
        resolve()
      }
    }
  })
}

async function saveKey(key: CryptoKey): Promise<void> {
  await callOnStore((store: IDBObjectStore) => {
    store.put({ id: 1, key: key })
  })
  console.log(`key saved...`)
}

async function getKey(): Promise<CryptoKey> {
  return new Promise<CryptoKey>(async (resolve, reject) => {
    try {
      await callOnStore((store: IDBObjectStore) => {
        // resolve(store.get(1) as any);
        const op = store.get(1)
        op.onsuccess = async function () {
          const key = op?.result?.key
          resolve(key)
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}
