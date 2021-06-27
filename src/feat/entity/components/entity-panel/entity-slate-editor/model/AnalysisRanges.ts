import { Range } from 'slate'
export interface AnalysisRanges {
  charBeforeCursorRangeMinus1?: Range
  charBeforeCursorRange?: Range
  wordBeforeCursorRange?: Range
  wordBeforeCurrentWordRange?: Range
  lineBeforeCursorRange?: Range
  atRange?: Range
}
