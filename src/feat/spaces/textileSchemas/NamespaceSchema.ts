import { JSONSchema } from '@textile/threaddb'
import { CollectionConfig } from '@textile/threaddb/dist/cjs/remote/grpc'

export const NamespaceSchema: JSONSchema = {
  title: 'Namespace',
  type: 'object',
  required: ['_id', 'name', 'owningUser'],
  properties: {
    _id: {
      type: 'string',
      description: 'User ID',
    },
    name: {
      type: 'string',
      description: 'name',
    },
    owningUser: {
      type: 'string',
      description: 'owningUser',
    },
  },
}
export const NamespaceCollection: CollectionConfig = {
  name: 'Namespace',
  schema: NamespaceSchema,
}
