import { Button, Input } from '@chakra-ui/react'
import React from 'react'

import { GenericModal } from '../../../common/components'
import { navigateWithCtrlSensitivity } from '../../../common/util/navigate'
import { StringIndexable } from '../../indexes/models/StringIndexable'
import { SearchService } from '../../search/services/search.service'

export interface EntitySearchModalProps {
  onClose: () => void
}

export function EntitySearchModal(props: EntitySearchModalProps) {
  const [searchText, setSearchText] = React.useState('')
  const [indexedItems, setIndexedItems] = React.useState<StringIndexable[]>([])

  // ixsearch example
  React.useEffect(() => {
    if (searchText == '') {
      setIndexedItems([])
      return
    }

    const items = SearchService.searchEntityHeaders(searchText || '').slice(0, 4)
    setIndexedItems(items)
  }, [searchText])

  return (
    <GenericModal
      showCancelButton={false}
      okButtonText="Done"
      cancelCallback={() => props.onClose()}
      okCallback={() => props.onClose()}
      title="Search Items"
      height="400px"
      width="300px"
    >
      <Input autoFocus onChange={(event) => setSearchText(event.target.value)} />
      {indexedItems.map((item) => {
        return (
          <Button
            key={item.id}
            onClick={(e) => {
              navigateWithCtrlSensitivity(`/item/${item.id}`, e)
              props.onClose()
            }}
          >
            {item.value}
          </Button>
        )
      })}
    </GenericModal>
  )
}
