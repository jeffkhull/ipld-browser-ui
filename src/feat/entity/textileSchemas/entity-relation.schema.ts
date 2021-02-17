import { JSONSchema } from '@textile/threaddb'
import { CollectionConfig } from '@textile/threaddb/dist/cjs/remote/grpc'

export const EntityRelationSchema: JSONSchema = {
  title: 'EntityRelation',
  type: 'object',
  required: ['_id', 'relationId', 'sourceId', 'targetId'],
  properties: {
    _id: {
      type: 'string',
      description: '_id',
    },
    relationId: {
      type: 'string',
      description: 'relationId',
    },
    sourceId: {
      type: 'string',
      description: 'sourceId',
    },
    targetId: {
      type: 'string',
      description: 'targetId',
    },
  },
}
export const EntityRelationCollection: CollectionConfig = {
  name: 'EntityRelation',
  schema: EntityRelationSchema,
}
