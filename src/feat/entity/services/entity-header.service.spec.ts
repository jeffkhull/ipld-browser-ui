import { expect } from 'chai'

import { repoMgr } from '../../../common/storage/repos/repo-manager.service'
import { EntityHeaderService } from './entity-header.service'

describe('should do thing', () => {
  // let repo = new RepoService()

  before(async () => {
    // Init repo mgr before each test
    await repoMgr.init({ localOnly: true })
  })

  after(() => {
    // Dispose repo mgr after each test
    repoMgr.dispose()
  })

  it('should write and retrieve entity header', async () => {
    const entity = await EntityHeaderService.createEntityFromName('name', 'namespace')
    expect(entity._id).not.undefined
    const retrieve = await EntityHeaderService.getEntityHeader(entity._id)
    expect(retrieve).not.undefined
  })
})
