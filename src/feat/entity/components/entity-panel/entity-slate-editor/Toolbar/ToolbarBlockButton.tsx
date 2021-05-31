import React from 'react'
import * as SlateReact from 'slate-react'
import { GenericToolbarButton } from './GenericToolbarButton'
import * as helpers from './helpers'
import { ToolbarIcon } from './ToolbarIcon'

export function ToolbarBlockButton(props: { format: any; icon: any; children?: any }) {
  const editor = SlateReact.useSlate()
  return (
    <GenericToolbarButton
      active={helpers.isBlockActive(editor, props.format).toString()}
      onMouseDown={(event: any) => {
        event.preventDefault()
        helpers.toggleBlock(editor, props.format)
      }}
    >
      <ToolbarIcon>{props.icon}</ToolbarIcon>
    </GenericToolbarButton>
  )
}
