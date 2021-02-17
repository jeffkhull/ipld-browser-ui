export class NotImplementedException extends Error {
  constructor(methodName?: string) {
    super(`${methodName || 'Method'} not implemented`)
  }
}
