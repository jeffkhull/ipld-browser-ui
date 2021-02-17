import * as fetchUtil from '../util/fetch'

const endpoints = {
  getHello: '/hello',
}

export async function getHello(): Promise<any> {
  const ret = fetchUtil.getFromServerNow(endpoints.getHello)
  return ret
}
