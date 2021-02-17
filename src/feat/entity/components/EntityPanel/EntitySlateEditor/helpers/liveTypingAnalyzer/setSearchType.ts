import { IndexedItemType } from '../../../../../../search/IxSearchModel/IndexedItemType'
import * as model from '../../model'

export function setSearchType(curData: model.CursorPostionData) {
  /**
   * Set Search type
   */

  if (curData.searchType !== IndexedItemType.ENTITY) {
    //   setSearchType(IxSearch.IndexedItemType.ENTITY);
    curData.searchType = IndexedItemType.ENTITY
  }
}
