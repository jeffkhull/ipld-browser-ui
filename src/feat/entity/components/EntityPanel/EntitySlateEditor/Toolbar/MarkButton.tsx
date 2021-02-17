import React from 'react'
import ReactDOM from 'react-dom'
import * as SlateReact from 'slate-react'
import * as Slate from 'slate'
import * as Reach from '@reach/router'
import { GenericToolbarButton } from './GenericToolbarButton'
import { ToolbarIcon } from './ToolbarIcon'
import * as helpers from './helpers'

export function MarkButton(props: { format: any; icon: any }) {
  const editor = SlateReact.useSlate()
  return (
    <GenericToolbarButton
      active={helpers.isMarkActive(editor, props.format).toString()}
      onMouseDown={(event: any) => {
        event.preventDefault()
        helpers.toggleMark(editor, props.format)
      }}
    >
      <ToolbarIcon>{props.icon}</ToolbarIcon>
    </GenericToolbarButton>
  )
}
