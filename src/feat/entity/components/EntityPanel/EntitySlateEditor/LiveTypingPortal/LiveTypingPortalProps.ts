import { IndexedItem } from '../../../../../search/IxSearchModel/IndexedItem'
import { IndexedItemType } from '../../../../../search/IxSearchModel/IndexedItemType'
import * as model from '../model'
export interface LiveTypingPortalProps {
  cursorRef: React.MutableRefObject<any>
  indexedItems: IndexedItem[]
  selectionIndex: number
  editor: any
  ltBoxTarget: any
  inlineSearchString: string
  searchType: IndexedItemType
  setLtBoxTarget: React.Dispatch<any>
  curData: model.CursorPositionData
}
