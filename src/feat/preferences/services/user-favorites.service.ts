import { NotImplementedException } from '../../../common/exceptions/not-implemented.exception'
import { repoMgr } from '../../../common/storage/repos/repo-manager.service'
import { EntityHeaderService } from '../../entity/services/entity-header.service'
import { UserFavorite, UserFavoriteResource } from '../models/user-favorite.model'
import { UserFavoriteReadable } from '../models/UserFavoriteReadable'
import { UserFavoriteType } from '../models/UserFavoriteType'

export class UserFavoritesService {
  static getForTargetId = async (entityId: string): Promise<UserFavorite[]> => {
    try {
      await repoMgr.awaitInitialized()
      return await repoMgr.userFavorites.find({ targetId: { $eq: entityId } })
    } catch (err) {
      console.error(`Error getting user favorite for target ID`, err)
      throw err
    }
  }

  static getAll = async (): Promise<UserFavorite[]> => {
    try {
      await repoMgr.awaitInitialized()
      return await repoMgr.userFavorites.getAll()
    } catch (err) {
      console.error(`Error getting user favorites`, err)
      throw err
    }
  }

  static createFavorite = async (entityId: string) => {
    try {
      await repoMgr.awaitInitialized()
      const fav = await repoMgr.userFavorites.create(
        new UserFavoriteResource(entityId, UserFavoriteType.Entity),
      )
      return fav
    } catch (err) {
      console.error(`Error creating favorite`, err)
      throw err
    }
  }

  static deleteFavorite = async (entityId: string) => {
    // throw new NotImplementedException('UserFavoritesService.deleteFavorite')
    const res = await repoMgr.userFavorites.find({ targetId: { $eq: entityId } })
    await repoMgr.userFavorites.deleteMany(res)
  }

  static getAllReadable = async (): Promise<UserFavoriteReadable[]> => {
    const allFavs = await UserFavoritesService.getAll()
    const readable: UserFavoriteReadable[] = []
    for (let i = 0; i < allFavs.length; i++) {
      const entity = await EntityHeaderService.getEntityHeader(allFavs[i].targetId)
      readable.push({
        ...allFavs[i],
        name: entity.name,
      })
    }
    return readable
  }
}
