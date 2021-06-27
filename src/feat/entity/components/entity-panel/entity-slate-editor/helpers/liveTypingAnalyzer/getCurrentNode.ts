import * as Slate from 'slate'
export function getCurrentNode(editor: any, cursorPoint: Slate.Point): Slate.NodeEntry<Slate.Node> {
  return Slate.Editor.node(editor, cursorPoint)
}
