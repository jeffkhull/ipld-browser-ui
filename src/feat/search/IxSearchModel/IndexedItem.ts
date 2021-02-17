import { IndexedItemType } from './IndexedItemType'

export interface IndexedItem {
  id: string
  name: string
  type: IndexedItemType
  /**
   * Order item should show up in search results.  lower number means higher priority.
   */
  priority: number
}
