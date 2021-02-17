import { repoMgr } from '../../../common/storage/repos/repo-manager.service'
import { blankEntityClass, EntityClassResource } from '../models/entity-class.model'

export class EntityClassService {
  static createEntityClass = async (name: string, namespaceId: string) => {
    const instance = repoMgr.classes.create(new EntityClassResource(name, namespaceId))
    await instance.save()
    return instance
  }

  static getEntityClass = async (id: string) => {
    const entClass = repoMgr.classes.findOne({ _id: { $eq: id } })
    return (await entClass) || blankEntityClass
  }
}
