import { Point } from 'slate'
import * as model from '../../model'

export function gatherSentenceInfo(
  editor: any,
  cursorPoint: Point,
  curData: model.CursorPostionData,
) {
  /**
   * Current Sentence
   */
  curData.lineInfo.currentLineContainsPunctuation =
    curData.lineInfo.currentLineText?.match(model.regexMatchers.isPunctuationMark) != null

  if (curData.lineInfo.currentLineContainsPunctuation === false) {
    curData.sentenceInfo.currentSentenceText = curData.lineInfo.lineBeforeCursorText
  } else {
    const lastSentence = curData.lineInfo.lineBeforeCursorText?.match(
      model.regexMatchers.lastSentence,
    )
    curData.sentenceInfo.currentSentenceText = lastSentence == null ? '' : lastSentence[0].trim()
  }

  /**
   * First word in sentence?
   */
  if (
    curData.paragraphInfo.isParagraphBegin ||
    curData.charInfo.cursorIsPreceededByPunctuation ||
    curData.wordInfo.prevWordHasPunctuation ||
    curData.nodeInfo.isFirstWordInNode
  )
    curData.sentenceInfo.isFirstWordInSentence = true
}
