import React from 'react'
import * as subComponents from './Toolbar/subComponents'
import { css, cx } from 'emotion'

const cn1 = css`
  position: relative;
  padding-right: 10px;
  padding-left: 18px;
  padding-bottom: 17px;
  padding-top: 1px;
  margin-bottom: 20px;
  margin-left: -20px;
  margin-right: -10px;
  margin-top: 0px;
`

export function Toolbar(props: any) {
  return (
    <div
      id="editor-toolbar"
      {...props}
      //   ref={ref as any}
      className={cx(
        // props.className,
        cn1,
        css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `,
      )}
    >
      <subComponents.MarkButton format="bold" icon="format_bold" />
      <subComponents.MarkButton format="italic" icon="format_italic" />
      <subComponents.MarkButton format="underline" icon="format_underlined" />
      <subComponents.MarkButton format="code" icon="code" />
      <subComponents.ToolbarBlockButton format="heading-one" icon="looks_one" />
      <subComponents.ToolbarBlockButton format="heading-two" icon="looks_two" />
      <subComponents.ToolbarBlockButton format="block-quote" icon="format_quote" />
      <subComponents.ToolbarBlockButton format="numbered-list" icon="format_list_numbered" />
      <subComponents.ToolbarBlockButton format="bulleted-list" icon="format_list_bulleted" />
    </div>
  )

  //   return (
  //     <subComponents.ToolbarWrapper>
  //       <subComponents.MarkButton format="bold" icon="format_bold" />
  //       <subComponents.MarkButton format="italic" icon="format_italic" />
  //       <subComponents.MarkButton format="underline" icon="format_underlined" />
  //       <subComponents.MarkButton format="code" icon="code" />
  //       <subComponents.ToolbarBlockButton format="heading-one" icon="looks_one" />
  //       <subComponents.ToolbarBlockButton format="heading-two" icon="looks_two" />
  //       <subComponents.ToolbarBlockButton format="block-quote" icon="format_quote" />
  //       <subComponents.ToolbarBlockButton format="numbered-list" icon="format_list_numbered" />
  //       <subComponents.ToolbarBlockButton format="bulleted-list" icon="format_list_bulleted" />
  //     </subComponents.ToolbarWrapper>
  //   );
}
