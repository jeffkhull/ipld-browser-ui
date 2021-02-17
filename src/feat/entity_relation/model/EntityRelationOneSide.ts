import { Relation } from '../../relation/models/relation.model'

// export interface EntityRelationOneSide {
//   entRelId: string
//   otherEntity: EntityHeader
//   relation: Relation
// }

export interface EntityRelationOneSide {
  entRelId: string
  targetName: string
  targetId: string
  relationId: string
  relationName: string
}

export class EntityRelationOneSideResource implements EntityRelationOneSide {
  constructor(
    public entRelId: string,
    public targetName: string,
    public targetId: string,
    public relationId: string,
    public relationName: string,
  ) {}
}
