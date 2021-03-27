import { Box, Button, Heading, Input, Flex } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import * as Reach from '@reach/router'
import { css } from 'emotion'
import React from 'react'
import { SingleTextInputModal } from '../../../common/components'
import { IndexedItemFilter } from '../../search/IxSearchModel/IndexedItemFilter'
import { spaceSelectors, useSpacesStore } from '../../spaces/stores/SpacesStore'
import { userStoreSelectors, useUserStore } from '../../user/stores/UserStore'
import { EntityHeaderService } from '../services/entity-header.service'
import { EntityFilterControl } from './EntitySummaryPanel/EntityFilterControl'
import { EntitySearchResultDrop } from './EntitySummaryPanel/EntitySearchResultsDrop'
import { ItemsSummaryPanel } from './EntitySummaryPanel/ItemsSummaryPanel'
import { RecentActivityPanel } from './EntitySummaryPanel/RecentActivityPanel'
import { UserFavoritesPanel } from './EntitySummaryPanel/UserFavoritesPanel'
import { widget33 } from './styles'

export interface EntitySummaryPanelProps {
  path: string
}

export function EntitySummaryPanel(props: EntitySummaryPanelProps) {
  const searchDropRef = React.useRef()
  const [searchDropVisible, setSearchDropVisible] = React.useState(false)
  const [searchFilter, setSearchFilter] = React.useState<IndexedItemFilter>({
    nameSearchTerm: '',
    classIds: [],
  })
  const user = useUserStore(userStoreSelectors.user)

  const [newEntNameInputOpen, setNewEntNameInputOpen] = React.useState(false)
  const currentSpace = useSpacesStore(spaceSelectors.currentSpace)

  const createNewEntity = React.useCallback(
    async (name: string) => {
      setNewEntNameInputOpen(false)
      const newEntity = await EntityHeaderService.createEntity(name, currentSpace?._id)
      void Reach.navigate(`/item/${newEntity._id}`)
    },
    [user.defaultNamespaceId],
  )

  return (
    <>
      {newEntNameInputOpen && (
        <SingleTextInputModal
          id="entity-edit-name-entry"
          heading="Name for New Item"
          hintText="Enter Name"
          okCallback={(name: string) => {
            void createNewEntity(name)
          }}
          cancelCallback={() => {
            setNewEntNameInputOpen(false)
          }}
        />
      )}
      {/* TODO: figure out where these extra styles are coming from??? */}
      <Box
        id="entity-summary-panel"
        className={css`
          display: flex;
          flex-direction: row;
          background
        `}
      >
        <Box
          id="heading-wrapper"
          className={css`
            padding: 20px;
            flex: 0 0 250px;
          `}
        >
          <Heading margin="none">Items Home</Heading>
        </Box>
        <Box
          id="add-new-btn-wrapper"
          className={css`
            flex: 1 0 200px;
            align-items: flex-start;
            margin-left: 20px;
          `}
        >
          <Button
            className={css`
              height: 50px;
              margin-top: 28px;
              max-width: 10rem;
              margin-right: 100px;
            `}
            title="Add new"
            size="lg"
            aria-label="Add new"
            onClick={() => setNewEntNameInputOpen(true)}
            leftIcon={<AddIcon />}
          >
            Add new
          </Button>
        </Box>
      </Box>
      <Box
        id="items-home-items-wrapper"
        className={css`
          margin-top: 20px;
          padding: 20px;
        `}
      >
        <Box
          id="items-search-wrapper"
          ref={searchDropRef as any}
          className={css`
            display: flex;
            flex-direction: row;
          `}
        >
          <Box
            className={css`
              flex: 0 0 400px;
            `}
          >
            <EntitySearchResultDrop
              visible={searchDropVisible}
              onClickOutside={() => {
                setSearchDropVisible(false)
              }}
              searchFilter={searchFilter}
            >
              <Box>
                <Input
                  size="lg"
                  placeholder="Search items..."
                  value={searchFilter.nameSearchTerm || ''}
                  onChange={(e) => {
                    if (!searchDropVisible) setSearchDropVisible(true)
                    setSearchFilter({ ...searchFilter, nameSearchTerm: e.target.value })
                  }}
                  //   ref={searchDropRef as any}
                  onKeyUp={(e) => {
                    if (e.key === 'Escape') setSearchFilter({ ...searchFilter, nameSearchTerm: '' })
                  }}
                  // onFocus={() => setSearchDropVisible(true)}
                  onBlur={() => setSearchDropVisible(false)}
                />
              </Box>
            </EntitySearchResultDrop>
          </Box>
          <EntityFilterControl
            className={css`
              flex: 1 0 400px;
              margin-left: 20px;
            `}
            updateFilter={(filter: IndexedItemFilter) => {
              setSearchFilter(filter)
            }}
          />
        </Box>
        <Flex direction="row">
          <ItemsSummaryPanel />
          <RecentActivityPanel />
          <UserFavoritesPanel />
        </Flex>
      </Box>
    </>
  )
}
