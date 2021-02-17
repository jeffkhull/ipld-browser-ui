import { JSONSchema } from '@textile/threaddb'
import { CollectionConfig } from '@textile/threaddb/dist/cjs/remote/grpc'

export const UserFavoriteSchema: JSONSchema = {
  title: 'UserFavorite',
  type: 'object',
  required: ['_id', 'targetId', 'type'],
  properties: {
    _id: {
      type: 'string',
      description: '_id',
    },
    targetId: {
      type: 'string',
      description: 'targetId',
    },
    type: {
      type: 'string',
      description: 'User favorite type',
    },
  },
}
export const UserFavoriteCollection: CollectionConfig = {
  name: 'UserFavorite',
  schema: UserFavoriteSchema,
}
