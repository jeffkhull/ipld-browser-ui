import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import Select from 'react-select'

import { NotImplementedException } from '../../../common/exceptions/not-implemented.exception'
import { ReactSelectItem } from '../../../common/models/react-select-item.model'
import { RelationService } from '../services/relation.service'

export interface RelationSelectorProps {
  className: string
  setSelectedRelationId: (val: string) => void
  defaultNamespaceId: string
  autofocus: boolean
  getDdRef?: (ref: any) => void
  required?: boolean
}

export function RelationSelector(props: RelationSelectorProps) {
  const [searchText, setSearchText] = React.useState('')
  const [searchResults, setSearchResults] = React.useState<ReactSelectItem[]>([])
  const [selected, setSelected] = React.useState<ReactSelectItem | null>(null)
  const ddRef = React.useRef<any>()

  React.useEffect(() => {
    void updateOptions(searchText)
  }, [searchText])

  React.useEffect(() => {
    if (props.getDdRef) props.getDdRef(ddRef)
    if (props.autofocus && ddRef?.current != null) ddRef.current.focus()
  }, [])

  const updateOptions = React.useCallback(async (searchString: string) => {
    throw new NotImplementedException('Method')
    // const matches = await IxSearch.getTextMatchesFromIndexedDb(
    //   searchString,
    //   IxSearch.IndexedItemType.RELATION,
    //   10,
    // )

    // if (matches.length == 0) {
    //   setSearchResults([
    //     {
    //       id: 'createnew',
    //       namespaceId: '',
    //       value: `Create new relation '${searchString}'`,
    //       isDeprecated: 0,
    //       classId: '',
    //       version: 0,
    //     },
    //   ])
    // } else {
    //   setSearchResults(matches)
    // }
  }, [])

  const createwNewRelation = React.useCallback(
    async (name: string, namespaceId: string) => {
      await RelationService.createRelation(name, namespaceId)
      // const res = await relationApi.createRelation({
      //   relation: { id: undefined, name: name, namespace_id: namespaceId },
      // } as any)
      // const ixItem: StringIndexable = {
      //   id: res.id,
      //   namespaceId: namespaceId,
      //   value: name,
      //   isDeprecated: 0,
      //   classId: '',
      //   version: 0,
      // }
      // props.setSelectedRelationId(res.id)
      // setSearchResults([ixItem])
      // setSelected(ixItem)
    },
    [setSelected, props.setSelectedRelationId],
  )

  return (
    <Box id="entity-class-selector" className={props.className}>
      <Select
        ref={ddRef as any}
        options={searchResults}
        value={selected || { value: '', label: 'Select a relation...' }}
        placeholder="Select a relation..."
        emptySearchMessage="Type to search or create new"
        valueKey="Id"
        labelKey="Value"
        onSearch={(text: string) => setSearchText(text)}
        onChange={(newValue) => {
          if (newValue == null) return
          if (newValue.value === 'createnew') {
            console.log(`default namespace id is: `, props.defaultNamespaceId)
            void createwNewRelation(searchText, props.defaultNamespaceId)
            return
          }

          setSelected(newValue)
          props.setSelectedRelationId(newValue.value)
        }}
      />
      {props.required && (selected == null || selected.value === '') && (
        <Text color="status-error">Required</Text>
      )}
    </Box>
  )
}
