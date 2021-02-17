import { JSONSchema } from '@textile/threaddb'
import { CollectionConfig } from '@textile/threaddb/dist/cjs/remote/grpc'

// import { CollectionConfig } from "@textile/threaddb/dist/cjs/remote/grpc"

export const EntityDocumentSchema: JSONSchema = {
  title: 'EntityDocument',
  type: 'object',
  required: ['_id', 'documentJson'],
  properties: {
    _id: {
      type: 'string',
      description: 'Entity ID',
    },
    documentJson: {
      type: 'string',
      description: 'Document JSON',
    },
  },
}
export const EntityDocCollection: CollectionConfig = {
  name: 'EntityDocument',
  schema: EntityDocumentSchema,
}
