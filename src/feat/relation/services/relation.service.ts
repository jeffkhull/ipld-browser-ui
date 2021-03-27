import { repoMgr } from '../../../common/storage/repos/repo-manager.service'
import { blankRelation, Relation, RelationResource } from '../models/relation.model'

export class RelationService {
  static createRelation = async (name: string, namespaceId: string) => {
    const rel = repoMgr.relations.create(new RelationResource(namespaceId, name))
    await rel.save()
    return rel
  }
  static getRelation = async (id: string) => {
    const entClass = repoMgr.relations.findOne({ _id: { $eq: id } })
    return (await entClass) || blankRelation
  }
  static getAllRelations = async (): Promise<Relation[]> => {
    await repoMgr.awaitInitialized()
    const res = repoMgr.relations.find({})
    return res.toArray()
  }
}
