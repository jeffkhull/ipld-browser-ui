import * as Slate from 'slate'
export function isFirstNodeInParagraph(editor: any, cursorPoint: Slate.Point): boolean {
  if (cursorPoint.path[1] === 0 || cursorPoint.path[1] === 1) {
    return true
  } else {
    return false
  }
}
