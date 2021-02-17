import { Element as SlateNode } from 'slate'

export interface EntityMemoryState {
  nameUpdatePending: boolean
  docUpdatePending: boolean
  docIsUpdating: boolean
  nameIsUpdating: boolean
  draftDoc: SlateNode[]
}

export const entityMemoryState: EntityMemoryState = {
  docIsUpdating: false,
  nameUpdatePending: false,
  docUpdatePending: false,
  nameIsUpdating: false,
  draftDoc: [],
}
export function clearDraftDocNodes() {
  entityMemoryState.draftDoc = []
}
