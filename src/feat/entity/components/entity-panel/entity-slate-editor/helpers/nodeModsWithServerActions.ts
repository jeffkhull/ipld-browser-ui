import * as Slate from 'slate'
import { IndexedItemType } from '../../../../../search/IxSearchModel/IndexedItemType'
import * as nodeModifiers from './nodeModifiers'
export async function processLtItemSelection(
  editor: any,
  ltBoxTarget: any,
  curData: any,
  searchType: any,
  indexedItem: any,
  setLtBoxTarget: any,
): Promise<void> {
  //   event.preventDefault();
  if (indexedItem == null) {
    // No item underlies selection.  Exit for now.  In the future, may want to allow "create new on enter" for selection
    setLtBoxTarget(null)
    return
  }

  Slate.Transforms.select(editor, ltBoxTarget)

  if (searchType === IndexedItemType.ENTITY) {
    Slate.Transforms.select(editor, ltBoxTarget)
    nodeModifiers.insertSubjEntityLink(editor, indexedItem)
    setLtBoxTarget(null)
  } else {
    setLtBoxTarget(null)
    throw new Error(`No handler to insert node for search type ${searchType}`)
  }
}
