import { JSONSchema } from '@textile/threaddb'
import { CollectionConfig } from '@textile/threaddb/dist/cjs/remote/grpc'

export const RelationSchema: JSONSchema = {
  title: 'Relation',
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
export const RelationCollection: CollectionConfig = {
  name: 'Relation',
  schema: RelationSchema,
}
