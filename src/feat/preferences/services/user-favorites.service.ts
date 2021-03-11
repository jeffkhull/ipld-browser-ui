import { NotImplementedException } from '../../../common/exceptions/not-implemented.exception'
import { repoMgr } from '../../../common/storage/repos/repo-manager.service'
import { UserFavorite, UserFavoriteResource } from '../models/user-favorite.model'
import { UserFavoriteReadable } from '../models/UserFavoriteReadable'
import { UserFavoriteType } from '../models/UserFavoriteType'

export class UserFavoritesService {
  static getForTargetId = async (entityId: string): Promise<UserFavorite[]> => {
    try {
      await repoMgr.awaitInitialized()
      const qry = repoMgr.userFavorites.find({ targetId: { $eq: entityId } })
      return await qry.toArray()
    } catch (err) {
      console.error(`Error getting user favorite for target ID`, err)
      throw err
    }
  }

  static getAll = async (): Promise<UserFavorite[]> => {
    try {
      await repoMgr.awaitInitialized()
      const qry = repoMgr.userFavorites.find()
      return await qry.toArray()
    } catch (err) {
      console.error(`Error getting user favorites`, err)
      throw err
    }
  }

  static createFavorite = async (entityId: string) => {
    try {
      await repoMgr.awaitInitialized()
      const fav = repoMgr.userFavorites.create(
        new UserFavoriteResource(entityId, UserFavoriteType.Entity),
      )
      await fav.save()
      return fav
    } catch (err) {
      console.error(`Error creating favorite`, err)
      throw err
    }
  }

  static deleteFavorite = async (entityId: string) => {
    // throw new NotImplementedException('UserFavoritesService.deleteFavorite')
    const qry = repoMgr.userFavorites.find({ targetId: { $eq: entityId } })
    void qry.delete()
  }

  static getAllReadable = async (): Promise<UserFavoriteReadable[]> => {
    throw new NotImplementedException('UserFavoritesService.getAllReadable')
    // const allFavs = await UserFavoritesService.getAll()
    // const readable: UserFavoriteReadable[] = []
    // for (let i = 0; i < allFavs.length; i++) {
    //   const name = await IndexService.getEntityName(allFavs[i].targetId)
    //   readable.push({
    //     ...allFavs[i],
    //     name: name,
    //   })
    // }
    // return readable
  }
}
