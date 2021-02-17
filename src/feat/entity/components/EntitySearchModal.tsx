import React from 'react'
import { Input, Button } from '@chakra-ui/react'
import { IndexedItemFilter } from '../../search/IxSearchModel/IndexedItemFilter'
import { IndexedItem } from '../../search/IxSearchModel/IndexedItem'
import { GenericModal } from '../../../common/components'
import { navigateWithCtrlSensitivity } from '../../../common/util/navigate'

export interface EntitySearchModalProps {
  onClose: () => void
}

export function EntitySearchModal(props: EntitySearchModalProps) {
  const [searchText, setSearchText] = React.useState('')
  const [indexedItems, setIndexedItems] = React.useState<IndexedItem[]>([])

  // ixsearch example
  React.useEffect(() => {
    if (searchText == '') {
      setIndexedItems([])
      return
    }

    // void IxSearch.getIndexedItems(
    //   { id: '', name: '' },
    //   searchText,
    //   IxSearch.IndexedItemType.ENTITY,
    //   (items: IxSearch.IndexedItem[]) => {
    //     console.log(`got indexed items: `, items)
    //     setIndexedItems(items)
    //   },
    //   10,
    // )
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
            {item.name}
          </Button>
        )
      })}
    </GenericModal>
  )
}
