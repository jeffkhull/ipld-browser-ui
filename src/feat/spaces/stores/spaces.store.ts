import create from 'zustand'
import { Namespace } from '../model/namespace.model'

// Nice code sandbox example https://codesandbox.io/s/nice-lake-kym1p?file=/src/App.js

export interface SpacesStoreSchema extends Record<string, unknown> {
  currentSpaceId: string
  selectedSpaceIds: string[]
  setSelectedSpaceIds: (spaceIds: string[]) => void
  availableSpaces: Namespace[]
  setAvailableSpaces: (spaces: Namespace[]) => void
  setCurrentSpaceId: (spaceId: string) => void
}

export const useSpacesStore = create<SpacesStoreSchema>((set) => ({
  currentSpaceId: '',
  selectedSpaceIds: ['first'] as string[],
  setSelectedSpaceIds: (newSpaces: string[]) => {
    console.log(`setting to `, newSpaces)
    set((state) => {
      return { selectedSpaceIds: [...newSpaces] }
    })
  },
  availableSpaces: [],
  setAvailableSpaces: (spaces: Namespace[]) => {
    set((state) => {
      return { availableSpaces: [...spaces] }
    })
  },
  setCurrentSpaceId: (spaceId: string) => {
    set((state) => {
      return { currentSpaceId: spaceId }
    })
  },
}))

export const spaceSelectors = {
  currentSpace: (state: SpacesStoreSchema) => {
    const res = state.availableSpaces.filter((x) => x._id === state.currentSpaceId)[0]
    return res
  },
  selectedSpaces: (state: SpacesStoreSchema) => {
    const res = state.availableSpaces.filter((x) => state.selectedSpaceIds.includes(x._id))
    return res
  },
  availableSpaces: (state: SpacesStoreSchema) => state.availableSpaces,
}

export const spaceMutators = {
  setAvailableSpaces: (state: SpacesStoreSchema) => state.setAvailableSpaces,
  setCurrentSpaceId: (state: SpacesStoreSchema) => state.setCurrentSpaceId,
}
