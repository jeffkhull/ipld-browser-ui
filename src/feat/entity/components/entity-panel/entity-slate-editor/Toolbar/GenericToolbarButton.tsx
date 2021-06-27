import { css, cx } from 'emotion'
import React from 'react'

export * from '../EditorElement'

export const GenericToolbarButton = React.forwardRef(
  (
    props: {
      className?: any
      active: any
      reversed?: any
      children: any
      onMouseDown: any
    },
    ref,
  ) => (
    <span
      {...props}
      ref={ref as any}
      className={cx(
        props.className,
        css`
          cursor: pointer;
          color: ${props.reversed
            ? props.active
              ? 'white'
              : '#aaa'
            : props.active
            ? 'black'
            : '#ccc'};
        `,
      )}
    />
  ),
)
