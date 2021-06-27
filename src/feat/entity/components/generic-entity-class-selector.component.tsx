import { Box } from '@chakra-ui/react'
import React from 'react'
import Select from 'react-select'

import { NotImplementedException } from '../../../common/exceptions/not-implemented.exception'
import { ReactSelectItem } from '../../../common/models/react-select-item.model'

export interface GenericEntityClassSelectorProps {
  cssClassName?: string
  updateSelection: (selected: ReactSelectItem) => void
  placeholder?: string
  excludedIds?: string[]
}

export function GenericEntityClassSelector(props: GenericEntityClassSelectorProps) {
  const [searchText, setSearchText] = React.useState('')
  //   const [selectedClassId, setSelectedClassId] = React.useState("")
  const [selectedClass, setSelectedClass] = React.useState<ReactSelectItem>({
    value: '',
    label: 'Select a type...',
  })

  const [classSelection, setClassSelection] = React.useState<ReactSelectItem[]>([])

  const initClassSelection = React.useCallback(async () => {
    throw new NotImplementedException('Method')
    // let items = await IxSearch.getAllItemsOfType(IxSearch.IndexedItemType.CLASS)
    // if (props.excludedIds != null) {
    //   items = items.filter((x) => !props.excludedIds?.includes(x.id))
    // }
    // setClassSelection(items)
  }, [])

  const filterClassSelection = React.useCallback(
    async (filterString: string) => {
      throw new NotImplementedException('Method')
      // const items = await IxSearch.getTextMatchesFromIndexedDb(
      //   filterString,
      //   IxSearch.IndexedItemType.CLASS,
      //   10,
      // )
      // setClassSelection(items)
    },
    [props.excludedIds],
  )

  React.useEffect(() => {
    if (searchText === '' || searchText == null) {
      void initClassSelection()
    } else {
      void filterClassSelection(searchText)
    }
  }, [searchText])

  return (
    <Box className={props.cssClassName}>
      <Select
        options={classSelection}
        value={selectedClass}
        placeholder={props.placeholder || 'Select a Class'}
        emptySearchMessage="Type to search or create new"
        valueKey="Id"
        labelKey="Value"
        onSearch={(text: string) => setSearchText(text)}
        onChange={(newSelection) => {
          console.log(`selected newValue in onChange: `, newSelection)
          if (newSelection == null) return
          setSelectedClass(newSelection)
          props.updateSelection(newSelection)
        }}
      />
    </Box>
  )
}
