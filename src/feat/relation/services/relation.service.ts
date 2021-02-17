import { NotImplementedException } from '../../../common/exceptions/not-implemented.exception'
import { repoMgr } from '../../../common/storage/repos/repo-manager.service'
import { RelationResource } from '../models/relation.model'

export class RelationService {
  static createRelation = async (name: string, namespaceId: string) => {
    const rel = repoMgr.relations.create(new RelationResource(namespaceId, name))
    await rel.save()
    return rel
  }
}
