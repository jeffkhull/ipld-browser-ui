import { repoMgr } from '../../../common/storage/repos/repo-manager.service'
import { EntityHeaderService } from '../../entity/services/entity-header.service'
import { StringIndexable } from '../../indexes/models/StringIndexable'

const entityHeaderCache: StringIndexable[] = []

export class SearchService {
  static searchEntityHeaders = (searchString: string): StringIndexable[] => {
    const regex = new RegExp(searchString, 'gi')
    return entityHeaderCache.filter((item) => {
      return item.value.search(regex) >= 0
    })
  }

  static initEntityHeaderCache = async () => {
    try {
      const entities = await EntityHeaderService.getAllEntityHeaders()
      const mapped = entities.map((ent) => {
        return {
          id: ent._id,
          namespaceId: ent.namespaceId,
          value: ent.name,
          isDeprecated: ent.isDeprecated,
          classId: ent.classId,
          version: 1,
        }
      })
      console.log(`pushing ${mapped.length} items`)
      entityHeaderCache.push(...mapped)
    } catch (err) {
      console.error(`error init entity search cache`, err)
    }
  }
}
