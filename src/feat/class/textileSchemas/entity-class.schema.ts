import { JSONSchema } from '@textile/threaddb'
import { CollectionConfig } from '@textile/threaddb/dist/cjs/remote/grpc'

export const EntityClassSchema: JSONSchema = {
  title: 'EntityClass',
  type: 'object',
  required: ['_id', 'namespaceId', 'name'],
  properties: {
    _id: {
      type: 'string',
      description: '_id',
    },
    namespaceId: {
      type: 'string',
      description: 'namespaceId',
    },
    name: {
      type: 'string',
      description: 'name',
    },
  },
}
export const EntityClassCollection: CollectionConfig = {
  name: 'EntityClass',
  schema: EntityClassSchema,
}
