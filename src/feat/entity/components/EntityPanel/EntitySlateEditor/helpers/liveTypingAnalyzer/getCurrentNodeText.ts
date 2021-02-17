import * as Slate from 'slate'
export function getCurrentNodeText(editor: any, cursorPoint: Slate.Point): string {
  //   const text = Editor.string(editor, cursorPoint);
  const node = Slate.Editor.node(editor, cursorPoint)[0]
  const nodeString = Slate.Node.string(node)
  return nodeString
  //   return node.text
}
