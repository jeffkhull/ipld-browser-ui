import { DBCoreRangeType } from 'dexie'
import { NotImplementedException } from '../../../common/exceptions/not-implemented.exception'
import { repoMgr } from '../../../common/storage/repos/repo-manager.service'
import { EntityHeader, EntityHeaderResource } from '../model/entity-header.model'

export class EntityHeaderService {
  /**
   * @returns {string} the ID of the newly created entity
   */
  static createEntityFromName = async (
    name: string,
    namespaceId = 'default',
  ): Promise<EntityHeader> => {
    try {
      const instance = repoMgr.entHeaders.create(new EntityHeaderResource(namespaceId, name))
      await instance.save()
      return instance
    } catch (err) {
      console.error(`Error creating entity header!`, err)
      throw err
    }
  }

  static updateEntityName = async (entityId: string, newName: string) => {
    try {
      const header = await repoMgr.entHeaders.findById(entityId)
      if (header == null) throw new Error('No entity found with id' + entityId)
      header.name = newName
      await header.save()
    } catch (err) {
      console.error(`Error in updateEntityClass for entityId ${entityId}`)
      throw err
    }
  }

  static getEntityHeader = async (entityId: string): Promise<EntityHeader> => {
    await repoMgr.awaitInitialized()
    const res = await repoMgr.entHeaders.findById(entityId)
    if (res) return res

    throw new Error(`cannot find entity header with id ${entityId}`)
  }

  static getEntityHeaderCount = async () => {
    await repoMgr.awaitInitialized()
    const count = await repoMgr.entHeaders.count()
    return count
  }

  static getAllEntityHeaders = async (): Promise<EntityHeader[]> => {
    await repoMgr.awaitInitialized()
    const res = repoMgr.entHeaders.find({})
    return res.toArray()
  }

  static updateEntityClass = async (entityId: string, classId: string) => {
    try {
      const header = await repoMgr.entHeaders.findById(entityId)
      if (header == null) throw new Error('No entity found with id' + entityId)
      header.classId = classId
      await header.save()
    } catch (err) {
      console.error(`Error in updateEntityClass for entityId ${entityId}`)
      throw err
    }
  }
}
