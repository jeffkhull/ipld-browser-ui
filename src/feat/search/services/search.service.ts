import { repoMgr } from '../../../common/storage/repos/repo-manager.service'
import { EntityClass } from '../../class/models/entity-class.model'
import { EntityClassService } from '../../class/services/entity-class.service'
import { EntityHeaderService } from '../../entity/services/entity-header.service'
import { StringIndexable } from '../../indexes/models/StringIndexable'
import { Relation } from '../../relation/models/relation.model'
import { RelationService } from '../../relation/services/relation.service'

const entityHeaderCache: StringIndexable[] = []
const entityClassCache: EntityClass[] = []
const relationCache: Relation[] = []

export class SearchService {
  static searchEntityHeaders = (searchString: string): StringIndexable[] => {
    const regex = new RegExp(searchString, 'gi')
    return entityHeaderCache.filter((item) => {
      return item.value.search(regex) >= 0
    })
  }

  static searchEntityClasses = (searchString: string): EntityClass[] => {
    const regex = new RegExp(searchString, 'gi')
    return entityClassCache.filter((item) => {
      return item.name.search(regex) >= 0
    })
  }

  static searchRelations = (searchString: string): Relation[] => {
    const regex = new RegExp(searchString, 'gi')
    return relationCache.filter((item) => {
      return item.name.search(regex) >= 0
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
      entityHeaderCache.push(...mapped)
    } catch (err) {
      console.error(`error init entity search cache`, err)
    }
  }

  static initClassCache = async () => {
    try {
      const classes = await EntityClassService.getAllClasses()
      entityClassCache.push(...classes)
    } catch (err) {
      console.log(`error init entity class cache`)
    }
  }

  static initRelationCache = async () => {
    try {
      const relations = await RelationService.getAllRelations()
      relationCache.push(...relations)
    } catch (err) {
      console.log(`error init entity class cache`)
    }
  }

  static initAllCaches = async () => {
    await SearchService.initRelationCache()
    await SearchService.initClassCache()
    await SearchService.initEntityHeaderCache()
  }
}
