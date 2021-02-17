import { IndexType } from './models/IndexType'

export function getIxTypeFromIxName(ixName: string): IndexType {
  if (ixName.startsWith('entn')) return IndexType.EntityName
  if (ixName.startsWith('reln')) return IndexType.RelationName

  throw new Error(`Could not find index type based on ix name ${ixName}`)
}
