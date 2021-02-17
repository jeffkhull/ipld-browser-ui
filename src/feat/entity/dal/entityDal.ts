import { NotImplementedException } from '../../../common/exceptions/not-implemented.exception'
import { repoMgr } from '../../../common/storage/repos/repo-manager.service'
import { getFromServerNow } from '../../../common/util/fetch'
import { StringIndexable } from '../../indexes/models/StringIndexable'
import { EntityHeader } from '../model/entity-header.model'

const endpoints = {
  tryWrite: '/entity/testinsert',
  tryRead: '/entity/testread',
  getNewEntityGuid: '/entity/getNewEntityGuid',
  createNewEntity: '/entity/createnew',
  getHeader: '/entity/getheader',
  upsertEntityDoc: '/entity/upsertdoc',
  updateEntityName: '/entity/updatename',
  searchEntityName: '/entity/searchname',
  updateEntityClass: '/entity/updateclass',
  deprecateEntity: '/entity/deprecate',
}

export async function tryWrite(): Promise<void> {
  await getFromServerNow(endpoints.tryWrite)
}

export async function tryRead(): Promise<void> {
  return await getFromServerNow(endpoints.tryRead)
}

export async function getNewEntityGuid(): Promise<string> {
  return await getFromServerNow(endpoints.getNewEntityGuid)
}

export async function getEntityHeader(entId: string): Promise<EntityHeader> {
  const res = await repoMgr.entHeaders.findById(entId)
  if (res == null) throw new Error(`Could not find an entity header for entity ID ${entId}!`)
  console.log(`got header `, res)
  return res
  // const req: entityModel.GetEntityHeadersRequest = {
  //   EntityIds: [entityId],
  // }
  // return await fetchUtil.postToServerNow(endpoints.getHeader, req)
}

export async function setEntityDeprecated(
  entityId: string,
  isDeprecated: boolean,
  namespaceId: string,
): Promise<void> {
  throw new NotImplementedException('Method')
  // const payload: SetEntityDeprecatedCommand = {
  //   EntityId: entityId,
  //   IsDeprecated: isDeprecated,
  //   NamespaceId: namespaceId,
  // }
  // return await fetchUtil.postToServerNow(endpoints.deprecateEntity, payload)
}

export async function upsertEntityDocument(req: any): Promise<void> {
  throw new NotImplementedException('Method')
  // return await fetchUtil.postToServerNow(endpoints.upsertEntityDoc, req)
}

export async function updateEntityName(
  entityId: string,
  newName: string,
  namespaceId: string,
): Promise<void> {
  throw new NotImplementedException('Method')
  // const req: UpdateEntityNameRequest = {
  //   EntityId: entityId,
  //   NewName: newName,
  //   NamespaceId: namespaceId,
  // }
  // const res = await fetchUtil.postToServerNow(endpoints.updateEntityName, req)
}

export async function updateEntityClass(
  entityId: string,
  entityClassId: string,
  entityNamespaceId: string,
): Promise<void> {
  throw new NotImplementedException('Method')
  // const req: UpdateEntityClassRequest = {
  //   EntityId: entityId,
  //   NamespaceId: entityNamespaceId,
  //   NewEntityClassId: entityClassId,
  // }
  // return await fetchUtil.postToServerNow(endpoints.updateEntityClass, req)
}

export async function searchEntityName(searchString: string): Promise<StringIndexable[]> {
  throw new NotImplementedException('Method')
  // const req: SearchEntityNameRequest = { SearchString: searchString }
  // return await fetchUtil.postToServerNow(endpoints.searchEntityName, req)
}

export async function searchEntityNameWithCallback(
  searchString: string,
  callback: (res: StringIndexable[]) => void,
) {
  throw new NotImplementedException('Method')
  // const req: SearchEntityNameRequest = { SearchString: searchString }
  // fetchUtil.postToServerShortThrottle(endpoints.searchEntityName, req, callback)
}
