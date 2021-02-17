import { Box } from '@chakra-ui/react'
import './App.css'
import * as Reach from '@reach/router'
import React from 'react'
import { AdminPanel } from '../../../admin/AdminPanel'
import { EntityPanel, EntitySummaryPanel } from '../../../entity/components'
import { KnowledgeSummaryPanel } from '../../../summary/components'
import { ErrorBoundary } from '../../../telemetry/components/ErrorBoundary'
import { LeftNav } from './LeftNav'
import './spinners.css'

export function AppDisplayContainer() {
  return (
    <Box id="top-level-box" display="flex" flexDirection="row" w="100vw" h="100vh">
      <ErrorBoundary regionName="Nav Strip">
        <LeftNav id="gridarea-leftnav" gridArea="leftnav" />
      </ErrorBoundary>
      <ErrorBoundary regionName="App Body">
        <Box id="gridarea-main" flexDirection="row" display="flex" w="100%" overflow="hidden">
          {/* <NotifComponents.NotificationArray /> */}
          <Reach.Router style={{ width: '100%' }} id="app-body-router">
            <EntitySummaryPanel path="/" />
            <EntityPanel path="/item/:entityId" />
            <EntitySummaryPanel path="/item" />
            <AdminPanel path="/admin" />
            <KnowledgeSummaryPanel path="/summary" />
          </Reach.Router>
        </Box>
      </ErrorBoundary>
    </Box>
  )
}
