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

      console.log(`TRY RE-RETRIEVE WHAT WE JUST WROTE`)
      const exists = await instance.exists()
      console.log(`exists? `, exists)
      const header = await EntityHeaderService.getEntityHeader(instance._id)
      console.log(`got header`, header)

      return instance
    } catch (err) {
      console.error(`Error creating entity header!`, err)
      throw err
    }
  }
  static getEntityHeader = async (entityId: string): Promise<EntityHeader> => {
    await repoMgr.awaitInitialized()
    const res = await repoMgr.entHeaders.findById(entityId)
    if (res) return res

    throw new Error(`cannot find entity header with id ${entityId}`)
  }

  static getAllEntityHeaders = async (): Promise<EntityHeader[]> => {
    throw new NotImplementedException('getAllEntityHeaders')
    // const res = await repoMgr.entHeaders.getAll()
    // return res
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
