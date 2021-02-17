import { getCsrfToken } from '../../feat/authn/actions'

async function fetchBodyPostJson(
  url: string,
  reqBodyObject: any,
  authorizationHeaderValue: string | null = null,
) {
  try {
    const csrfToken = getCsrfToken()

    const params: RequestInit = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-CSRF-TOKEN': csrfToken,
        Accept: 'application/json',
        'sec-fetch-site': 'cross-site',
      },
      body: JSON.stringify(reqBodyObject),
    }

    const res = await fetch(url, params)
    if (res.status === 401 && window.location.pathname !== '/authcallback') {
      // if we get response unauthorized, we need to return the user to login
      console.error(`Got 401 unauthorized from POST to ${url}.  redirecting to login`)
      //   authActions.doSpacesLogin();
    }

    return await res.json()
  } catch (err) {
    console.error(`Problem calling fetch post from gui utils`)
    throw err
  }
}

async function fetchBodyGetJson(url: string, authorizationHeaderValue: string | null = null) {
  try {
    const csrfToken = getCsrfToken()

    const params: RequestInit = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'X-CSRF-TOKEN': csrfToken,
        Accept: 'application/json',
        'sec-fetch-site': 'cross-site',
      },
    }

    const resRaw = await fetch(url, params)

    if (resRaw.status === 401 && window.location.pathname !== '/authcallback') {
      // if we get response unauthorized, we need to return the user to login
      console.error(`Got 401 unauthorized from GET to ${url}.  redirecting to login`)
      console.error(`current window object ${window.location.origin}, ${window.location.pathname}`)
      //   authActions.doSpacesLogin();
    }

    const res = await resRaw.json()
    return res
  } catch (err) {
    console.error(`Problem calling fetch post from gui utils`)
    throw err
  }
}

export async function postToServerNow(endpoint: string, body: any): Promise<any> {
  return await fetchBodyPostJson('host' + endpoint, body)
}

export function postToServerShortThrottle(
  endpoint: string,
  body: any,
  callback: (res: any) => void,
) {
  postToServerThrottle(endpoint, body, 1000, callback)
}

// Holds timeout ids by endpoint
const throttleTimeoutIds: Map<string, any> = new Map()

// Holds references to bodies to be used in latest function call
const postToServerThrottleBodies: Map<string, any> = new Map()

function postToServerThrottle(
  endpoint: string,
  body: any,
  throttleMs: number,
  callback: (res: any) => void,
) {
  // This must be unique to this throttle "session".  If running multiple sessions on the same endpoint, will need to alter
  // params of this function to compensate for this.  This var is not inlined in order to keep this clear for the future.
  const timeoutKey = endpoint

  // Ensure latest body will be posted to server when timeout expires
  postToServerThrottleBodies.set(timeoutKey, body)

  // Get existing timeoutId if a timeout is already registered
  const existingTimeoutId = throttleTimeoutIds.get(timeoutKey)

  // Only register a new timeout if one doesn't already exist.
  if (existingTimeoutId == null) {
    const newTimeoutId = setTimeout(async () => {
      // Deregister timeoutId since we are executing it now.
      throttleTimeoutIds.delete(timeoutKey)
      console.log(`posting to endpoint ${endpoint}`)
      const res = await postToServerNow(endpoint, postToServerThrottleBodies.get(timeoutKey))
      callback(res)
    }, throttleMs)
    throttleTimeoutIds.set(timeoutKey, newTimeoutId)
  }
}

export async function getFromServerNow(endpoint: string): Promise<any> {
  return await fetchBodyGetJson('host' + endpoint)
}
