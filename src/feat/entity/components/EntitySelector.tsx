import { Box, Text } from '@chakra-ui/react'
import Select from 'react-select'
import React from 'react'

import { NotImplementedException } from '../../../common/exceptions/not-implemented.exception'
import { StringIndexable } from '../../indexes/models/StringIndexable'
import { EntityHeader } from '../model/entity-header.model'
import { EntityHeaderService } from '../services/entity-header.service'
import { ReactSelectItem } from '../../../common/models/react-select-item.model'

export interface EntitySelectorProps {
  className: string
  defaultNamespaceId: string
  setSelectedEntityId: (val: string) => void
  getDdRef?: (ref: any) => void
  autofocus?: boolean
  required?: boolean
}

export function EntitySelector(props: EntitySelectorProps) {
  const [searchText, setSearchText] = React.useState('')
  const [searchResults, setSearchResults] = React.useState<ReactSelectItem[]>([
    {
      value: 'createnew',
      label: '[Create New]',
    },
  ])
  const [selected, setSelected] = React.useState<ReactSelectItem | null>(null)
  const ddRef = React.useRef<any>()

  React.useEffect(() => {
    if (props.getDdRef) props.getDdRef(ddRef)
    void updateOptions(searchText)
    if (props.autofocus && ddRef?.current != null) ddRef.current.focus()
  }, [searchText])

  const updateOptions = React.useCallback(async (searchString: string) => {
    throw new NotImplementedException('Method')
    // const matches = await IxSearch.getTextMatchesFromIndexedDb(
    //   searchString,
    //   IxSearch.IndexedItemType.ENTITY,
    //   10,
    // )
    // if (matches.length == 0) {
    //   setSearchResults([
    //     {
    //       id: 'createnew',
    //       namespaceId: '',
    //       value: `Create new item '${searchString}'`,
    //       isDeprecated: 0,
    //       classId: '',
    //       version: 0,
    //     },
    //   ])
    // } else {
    //   setSearchResults(matches)
    // }
  }, [])

  const createNewEntity = React.useCallback(
    async (name: string, namespaceId: string) => {
      throw new NotImplementedException('Method')
      const res = await EntityHeaderService.createEntityFromName(name, namespaceId)
      // const ixItem: StringIndexable = {
      //   id: res.entityId,
      //   namespaceId: namespaceId,
      //   value: name,
      //   isDeprecated: 0,
      //   classId: '',
      //   version: 0,
      // }
      // props.setSelectedEntityId(res.entityId)
      // setSearchResults([ixItem])
      // setSelected(ixItem)
    },
    [setSelected, props.setSelectedEntityId],
  )

  return (
    <Box id="entity-class-selector" className={props.className}>
      <Select
        options={searchResults}
        ref={ddRef as any}
        value={selected || { value: '', label: 'Select an Entity...' }}
        placeholder="Select an Entity..."
        emptySearchMessage="Type to search or create new"
        valueKey="Id"
        labelKey="Value"
        onSearch={(text: string) => setSearchText(text)}
        onChange={(newValue) => {
          if (!newValue) return
          if (newValue.value === 'createnew') {
            void createNewEntity(searchText, props.defaultNamespaceId)
            return
          }

          setSelected(newValue)
          props.setSelectedEntityId(newValue.value)
        }}
      />
      {props.required && (selected == null || selected.value === '') && (
        <Text color="status-error">Required</Text>
      )}
    </Box>
  )
}
