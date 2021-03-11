import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'

import { StringIndexable } from '../../../indexes/models/StringIndexable'
import { IndexedItemFilter } from '../../../search/IxSearchModel/IndexedItemFilter'
import { SearchService } from '../../../search/services/search.service'
import { EntityLinkItem } from '../Common/EntityLinkItem'

export interface EntitySearchResultDropProps {
  visible: boolean
  onClickOutside: () => void
  searchFilter: IndexedItemFilter
  /**
   * This is the popover anchor element
   */
  children: React.ReactNode
}

export function EntitySearchResultDrop(props: EntitySearchResultDropProps) {
  // if (!props.visible) return <></>

  const [resultEntities, setResultEntities] = React.useState<StringIndexable[]>([])

  const refreshResultEntities = React.useCallback((filter: IndexedItemFilter) => {
    const items = SearchService.searchEntityHeaders(filter.nameSearchTerm || '').slice(0, 4)

    // console.log(`refresh result ent with filter `, filter)
    // const results = await getFilteredMatchesFromIndexedDb(filter, IndexedItemType.ENTITY, 10)
    setResultEntities(items)
  }, [])

  React.useEffect(() => {
    console.log(`CALLIGN WITH FILTER`, props.searchFilter)
    void refreshResultEntities(props.searchFilter)
  }, [props.searchFilter])

  React.useEffect(() => {
    console.log(`res entity length`, resultEntities.length)
  }, [resultEntities])

  // New chakra component
  return (
    <Popover
      isOpen={props.visible}
      id="search-popover"
      placement="bottom-start"
      // closeOnBlur={false}
      // onClose={props.onClickOutside}
    >
      {/* <PopoverTrigger>{props.children}</PopoverTrigger> */}
      <PopoverTrigger>{props.children}</PopoverTrigger>
      <PopoverContent color="white" borderColor="blue.800">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Box padding="15px">
            {resultEntities.map((item) => {
              console.log(`item`)
              return <EntityLinkItem key={item.id} item={item} />
            })}
          </Box>
        </PopoverBody>
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        ></PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
