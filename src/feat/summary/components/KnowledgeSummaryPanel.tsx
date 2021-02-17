import { Button } from '@chakra-ui/react'
import React from 'react'
import { cryptoDemo } from '../../../common/util/crypto'
import { ErrorBoundary } from '../../telemetry/components/ErrorBoundary'

export interface KnowledgeSummaryPanelProps {
  path?: string
}

export function KnowledgeSummaryPanel(props: KnowledgeSummaryPanelProps) {
  return (
    <ErrorBoundary regionName="Summary Panel">
      <Button
        style={{ width: '200px' }}
        onClick={() => {
          void cryptoDemo()
        }}
      >
        Try crypto
      </Button>
    </ErrorBoundary>
  )
}
