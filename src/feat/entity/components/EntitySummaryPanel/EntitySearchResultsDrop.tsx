import { css } from 'emotion'
import { Drop } from 'grommet'
import { Box } from '@chakra-ui/react'
import React from 'react'
import { IndexedItemFilter } from '../../../search/IxSearchModel/IndexedItemFilter'
import { StringIndexable } from '../../../indexes/models/StringIndexable'
import { NotImplementedException } from '../../../../common/exceptions/not-implemented.exception'
import { EntityLinkItem } from '../Common/EntityLinkItem'

export interface EntitySearchResultDropProps {
  dropRef: any
  visible: boolean
  onClickOutside: (e: React.MouseEvent<HTMLDocument, MouseEvent>) => void
  searchFilter: IndexedItemFilter
}

export function EntitySearchResultDrop(props: EntitySearchResultDropProps) {
  if (!props.visible || !props.dropRef.current) return <></>

  const [resultEntities, setResultEntities] = React.useState<StringIndexable[]>([])

  const refreshResultEntities = React.useCallback(async (filter: IndexedItemFilter) => {
    throw new NotImplementedException('Method')
    // console.log(`refresh result ent with filter `, filter)
    // const results = await getFilteredMatchesFromIndexedDb(filter, IndexedItemType.ENTITY, 10)
    // setResultEntities(results)
  }, [])

  React.useEffect(() => {
    void refreshResultEntities(props.searchFilter)
  }, [props.searchFilter])

  return (
    <Drop
      id="search-results-drop"
      align={{ top: 'bottom', left: 'left' }}
      target={props.dropRef.current}
      elevation="medium"
      onClickOutside={(e: React.MouseEvent<HTMLDocument, MouseEvent>) => {
        e.stopPropagation()
        props.onClickOutside(e)
      }}
    >
      <Box
        class={css`
          padding: 15px;
        `}
      >
        {resultEntities.map((item) => {
          return <EntityLinkItem key={item.id} item={item} />
        })}
      </Box>
    </Drop>
  )
}
