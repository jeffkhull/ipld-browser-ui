import { Box, Button, Heading } from '@chakra-ui/react'
import { css } from 'emotion'
import React from 'react'
import { NotImplementedException } from '../../common/exceptions/not-implemented.exception'
import { doTextileLogin } from '../authn/textile/TextileSession'

import { IndexPrefixName } from '../indexes/models/IndexPrefixName'
import { NotificationService } from '../notifications/services/NotificationService'
import { notifSelectors, useNotificationStore } from '../notifications/stores/NotificationStore'
import { ErrorBoundary } from '../telemetry/components/ErrorBoundary'
import { userStoreSelectors, useUserStore } from '../user/stores/UserStore'

export interface AdminPanelProps {
  path?: string
}

const rebuildBtn = css`
  margin-top: 15px;
  width: 150px;
`

export function AdminPanel(props: AdminPanelProps) {
  const user = useUserStore(userStoreSelectors.user)

  const notifStore = useNotificationStore(notifSelectors.all)
  const notifService = React.useMemo(() => {
    return new NotificationService(notifStore)
  }, [notifStore])

  const rebuildEntityIndexes = React.useCallback(async () => {
    throw new NotImplementedException('Method')
    // const req: ForceIndexRebuildCmd = {
    //   IndexPrefixName: IndexPrefixName.entn,
    //   NamespaceId: user.defaultNamespaceId,
    // }
    // const res = await indexApi.forceIndexUpdates(req)
    // // TODO - use new notify function in place of this one
    // notifService.notify(res.Msg)
  }, [user.defaultNamespaceId])

  const rebuildClassIndexes = React.useCallback(async () => {
    throw new NotImplementedException('Method')
    // const req: ForceIndexRebuildCmd = {
    //   IndexPrefixName: IndexPrefixName.clsn,
    //   NamespaceId: user.defaultNamespaceId,
    // }
    // const res = await indexApi.forceIndexUpdates(req)
    // notifService.notify(res.Msg)
  }, [user.defaultNamespaceId])

  const rebuildRelationIndexes = React.useCallback(async () => {
    throw new NotImplementedException('Method')
    // const req: ForceIndexRebuildCmd = {
    //   IndexPrefixName: IndexPrefixName.reln,
    //   NamespaceId: user.defaultNamespaceId,
    // }
    // const res = await indexApi.forceIndexUpdates(req)
    // notifService.notify(res.Msg)
  }, [user.defaultNamespaceId])

  return (
    <ErrorBoundary regionName="AdminPanel">
      <Box
        className={css`
          padding: 20px;
        `}
      >
        <Heading>Force Rebuild Indexes</Heading>
        <Box className={rebuildBtn}>
          <Button onClick={() => rebuildEntityIndexes()}>Entities</Button>
        </Box>
        <Box className={rebuildBtn}>
          <Button onClick={() => rebuildClassIndexes()}>Classes</Button>
        </Box>
        <Box className={rebuildBtn}>
          <Button onClick={() => rebuildRelationIndexes()}>Relations</Button>
        </Box>
        <Box className={rebuildBtn}>
          <Button onClick={() => doTextileLogin()}>Login with Metamask</Button>
        </Box>
        <Box className={rebuildBtn}>
          <Button
            onClick={async () => {
              //   const items = await repoMgr.kvPairs.getAll();
              //   console.log(`items from repo: `, items);
            }}
          >
            Test Repo Manager
          </Button>
        </Box>
      </Box>
    </ErrorBoundary>
  )
}
