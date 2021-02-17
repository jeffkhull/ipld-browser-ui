import { Point } from 'slate'
import * as model from '../../model'
import { getCurrentNodeText } from './getCurrentNodeText'
import * as Slate from 'slate'

export function gatherLineInfo(editor: any, cursorPoint: Point, curData: model.CursorPostionData) {
  /**
   * Line before cursor
   */
  const linePointBeforeCursor = Slate.Editor.before(editor, cursorPoint, { unit: 'line' })
  curData.analysisRanges.lineBeforeCursorRange =
    linePointBeforeCursor && Slate.Editor.range(editor, linePointBeforeCursor, cursorPoint)
  const lineBeforeCursorText =
    curData.analysisRanges.lineBeforeCursorRange &&
    Slate.Editor.string(editor, curData.analysisRanges.lineBeforeCursorRange)
  curData.charInfo.charBeforeCursor = lineBeforeCursorText?.slice(-1)
  const lineBeforeCursorTrimmed = lineBeforeCursorText?.trim()
  curData.lineInfo.lineBeforeCursorText = lineBeforeCursorText

  /**
   * Current line
   */
  curData.lineInfo.currentLineText = getCurrentNodeText(editor, cursorPoint)

  /**
   * Word position in node
   */
  curData.nodeInfo.isFirstWordInNode =
    curData.lineInfo.currentLineText.match(model.regexMatchers.matchAnySpace) == null

  /**
   * Preceeded by punctuation
   */
  // TODO - figure out where this needs to be set
  const preceededByPunctuationMatch = lineBeforeCursorTrimmed
    ?.slice(-1)
    .match(model.regexMatchers.isPunctuationMark)
  curData.charInfo.cursorIsPreceededByPunctuation = preceededByPunctuationMatch != null
}
