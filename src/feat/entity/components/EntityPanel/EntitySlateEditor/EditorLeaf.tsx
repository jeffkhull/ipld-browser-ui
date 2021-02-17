import React from 'react'

export function EditorLeaf(props: { attributes: any; children: any; leaf: any }) {
  //   console.log(`Render leaf with props `, props);
  let nodeChildren = { ...props.children }
  //   console.log(`rendering leaf...node children: `, nodeChildren);

  if (props.leaf.bold) {
    nodeChildren = <strong>{nodeChildren}</strong>
  }

  if (props.leaf.code) {
    nodeChildren = <code>{nodeChildren}</code>
  }

  if (props.leaf.italic) {
    nodeChildren = <em>{nodeChildren}</em>
  }

  if (props.leaf.underline) {
    nodeChildren = <u>{nodeChildren}</u>
  }

  return <span {...props.attributes}>{nodeChildren}</span>
}
