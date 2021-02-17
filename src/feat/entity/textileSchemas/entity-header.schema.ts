import { JSONSchema } from '@textile/threaddb'
import { CollectionConfig } from '@textile/threaddb/dist/cjs/remote/grpc'

export const EntityHeaderSchema: JSONSchema = {
  title: 'EntityHeader',
  type: 'object',
  required: ['_id', 'namespaceId', 'name'],
  properties: {
    _id: {
      type: 'string',
      description: 'User ID',
    },
    namespaceId: {
      type: 'string',
      description: 'namespaceId',
    },
    name: {
      type: 'string',
      description: 'name',
    },
    classId: {
      type: 'string',
      description: 'classId',
    },
    isDeprecated: {
      type: 'boolean',
      description: 'isDeprecated',
    },
    replacedBy: {
      type: 'string',
      description: 'replacedBy',
    },
  },
}
export const EntityHeaderCollection: CollectionConfig = {
  name: 'EntityHeader',
  schema: EntityHeaderSchema,
}
