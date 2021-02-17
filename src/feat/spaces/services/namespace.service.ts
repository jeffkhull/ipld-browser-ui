import { NotImplementedException } from '../../../common/exceptions/not-implemented.exception'
import { repoMgr } from '../../../common/storage/repos/repo-manager.service'
import { EntityHeaderResource } from '../../entity/model/entity-header.model'
import { Namespace, NamespaceResource } from '../model/namespace.model'

export class NamespaceService {
  static getAvailableForUser = async (): Promise<Namespace[]> => {
    // TODO - not implemented
    return []
    // throw new NotImplementedException('Method')
  }

  static createNamespace = async (name: string, owningUser: string): Promise<Namespace> => {
    const instance = repoMgr.namespaces.create(new NamespaceResource(name, owningUser))
    await instance.save()
    return instance
  }
}
