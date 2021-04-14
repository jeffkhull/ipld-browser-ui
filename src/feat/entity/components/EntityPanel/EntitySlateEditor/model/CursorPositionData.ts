import { IndexedItemType } from '../../../../../search/IxSearchModel/IndexedItemType'
import { AnalysisRanges } from './AnalysisRanges'
export interface ParagraphInfo {
  isParagraphBegin?: boolean
  isParagraphEnd?: boolean
  isEdgeOfParagraph?: boolean
  isFirstNodeInParagraph?: boolean
}

export interface SentenceInfo {
  currentSentenceText?: string
  isFirstWordInSentence?: boolean
}

export interface AtInfo {
  currentSentenceContainsAt?: boolean
}

export class NearbyNodesInfo {
  subjectEntityId?: string
}

export interface LineInfo {
  lineAfterAtText?: string
  lineBeforeCursorText?: string
  currentLineText?: string
  currentLineContainsPunctuation?: boolean
}

export interface CurrentNodeInfo {
  isFirstWordInNode?: boolean
  nodeDepth?: number
}

export interface WordInfo {
  prevWordHasPunctuation?: boolean
  wordBeforeCursor?: string
  wordStartsWithAtSymbol?: boolean
  wordFollowingAtSymbol?: string
}

export interface CharInfo {
  charAfterCursor?: string
  charBeforeCursor?: string
  cursorIsPreceededByPunctuation?: boolean
}

export interface CursorPositionData {
  analysisRanges: AnalysisRanges
  searchType: IndexedItemType
  charInfo: CharInfo
  wordInfo: WordInfo
  nodeInfo: CurrentNodeInfo
  lineInfo: LineInfo
  //   nearbyNodesInfo: NearbyNodesInfo;
  sentenceInfo: SentenceInfo
  atInfo: AtInfo
  paragraphInfo: ParagraphInfo
}
