import { JSONSchema } from '@textile/threaddb'
import { CollectionConfig } from '@textile/threaddb/dist/cjs/remote/grpc'

export const UserSchema: JSONSchema = {
  title: 'User',
  type: 'object',
  required: ['_id', 'publicKey', 'userName'],
  properties: {
    _id: {
      type: 'string',
      description: 'User ID',
    },
    publicKey: {
      type: 'string',
      description: 'publicKey',
    },
    userName: {
      type: 'string',
      description: 'userName',
    },
    email: {
      type: 'string',
      description: 'email',
    },
    firstName: {
      type: 'string',
      description: 'firstName',
    },
    lastName: {
      type: 'string',
      description: 'lastName',
    },
    defaultNamespaceId: {
      type: 'string',
      description: 'defaultNamespaceId',
    },
  },
}
export const UserCollection: CollectionConfig = {
  name: 'User',
  schema: UserSchema,
}
