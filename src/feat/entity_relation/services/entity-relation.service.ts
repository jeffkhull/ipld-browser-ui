import { NotImplementedException } from '../../../common/exceptions/not-implemented.exception'
import { repoMgr } from '../../../common/storage/repos/repo-manager.service'
import { EntityRelation, EntityRelationResource } from '../model/entity-relation.model'
import {
  EntityRelationOneSide,
  EntityRelationOneSideResource,
} from '../model/EntityRelationOneSide'

export class EntityRelationService {
  static getInboundRelationsReadable = async (eid: string): Promise<EntityRelationOneSide[]> => {
    await repoMgr.awaitInitialized()
    const qry = repoMgr.entRelations.find({ targetId: { $eq: eid } })
    const relations = await qry.toArray()
    const mapped = relations.map(
      (rel) =>
        new EntityRelationOneSideResource(
          rel._id,
          '[look up target name]',
          rel.targetId,
          rel.relationId,
          '[look up relation name]',
        ),
    )
    return mapped
  }

  static getOutboundRelationsReadable = async (eid: string): Promise<EntityRelationOneSide[]> => {
    await repoMgr.awaitInitialized()
    const qry = repoMgr.entRelations.find({ sourceId: { $eq: eid } })
    const relations = await qry.toArray()
    const mapped = relations.map(
      (rel) =>
        new EntityRelationOneSideResource(
          rel._id,
          '[look up target name]',
          rel.targetId,
          rel.relationId,
          '[look up relation name]',
        ),
    )
    return mapped
  }

  static deleteEntityRelation = async (id: string) => {
    throw new NotImplementedException('EntityRelationService.deleteEntityRelation')
  }

  /**
   * creates entity relation and returns its id
   */
  static createEntityRelation = async (
    sourceId: string,
    targetId: string,
    relationId: string,
  ): Promise<EntityRelation> => {
    const instance = repoMgr.entRelations.create(
      new EntityRelationResource(relationId, sourceId, targetId),
    )
    await instance.save()
    return instance
  }
}
