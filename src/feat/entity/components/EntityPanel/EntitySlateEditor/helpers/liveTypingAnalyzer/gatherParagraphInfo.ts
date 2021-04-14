import * as Slate from 'slate'
import { Point } from 'slate'
import * as model from '../../model'
import { isFirstNodeInParagraph } from './isFirstNodeInParagraph'
export function gatherParagraphInfo(
  editor: any,
  cursorPoint: Point,
  curData: model.CursorPositionData,
) {
  /**
   * Node position in paragraph
   */
  curData.paragraphInfo.isFirstNodeInParagraph = isFirstNodeInParagraph(editor, cursorPoint)

  /**
   * Paragraph edges
   */
  const isEdgeOfParagraph = Slate.Editor.isEdge(editor, cursorPoint, cursorPoint.path)
  const pointAfterCursor = Slate.Editor.after(editor, cursorPoint)
  const rangeAfterCursor = Slate.Editor.range(editor, cursorPoint, pointAfterCursor)
  const charAfterCursor = Slate.Editor.string(editor, rangeAfterCursor)
  curData.paragraphInfo.isEdgeOfParagraph = isEdgeOfParagraph
  curData.charInfo.charAfterCursor = charAfterCursor
  curData.paragraphInfo.isParagraphBegin =
    isEdgeOfParagraph &&
    ((charAfterCursor != null && charAfterCursor != '') ||
      (charAfterCursor === '' && curData.charInfo.charBeforeCursor === ''))
  curData.paragraphInfo.isParagraphEnd =
    isEdgeOfParagraph && (charAfterCursor == null || charAfterCursor === '')
}
