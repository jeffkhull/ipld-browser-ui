import { cx, css } from 'emotion'
// import { css } from 'emotion'
import React from 'react'

export * from '../EditorElement'
export const ToolbarIcon = React.forwardRef((props: { className?: any; children: any }, ref) => (
  <span
    {...props}
    ref={ref as any}
    className={cx(
      'material-icons',
      props.className,
      css`
        font-size: 18px;
        vertical-align: text-bottom;
      `,
    )}
  />
))
