import { JSONSchema } from '@textile/threaddb'

export const KvPairSchema: JSONSchema = {
  title: 'Test KV Pairs',
  type: 'object',
  required: ['_id', 'key', 'value'],
  properties: {
    _id: {
      type: 'string',
      description: 'the instance ID',
    },
    key: {
      type: 'string',
      description: 'the key',
    },
    value: {
      type: 'string',
      description: 'the value',
    },
  },
}
