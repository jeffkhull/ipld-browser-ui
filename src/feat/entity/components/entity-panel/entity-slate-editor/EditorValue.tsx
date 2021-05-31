import { css, cx } from 'emotion'
import React from 'react'

export * from './EditorElement'
export const EditorValue = React.forwardRef((params: { className: any; value: any }, ref) => {
  const textLines = params.value.document.nodes
    .map((node: any) => node.text)
    .toArray()
    .join('\n')
  return (
    <div
      ref={ref as any}
      {...params}
      className={cx(
        params.className,
        css`
          margin: 30px -20px 0;
        `,
      )}
    >
      <div
        className={css`
          font-size: 14px;
          padding: 5px 20px;
          color: #404040;
          border-top: 2px solid #eeeeee;
          background: #f8f8f8;
        `}
      >
        Slate's value as text
      </div>
      <div
        className={css`
          color: #404040;
          font: 12px monospace;
          white-space: pre-wrap;
          padding: 10px 20px;
          div {
            margin: 0 0 0.5em;
          }
        `}
      >
        {textLines}
      </div>
    </div>
  )
})
