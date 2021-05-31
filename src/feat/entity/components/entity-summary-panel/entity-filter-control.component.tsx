import { Box, Button, Text } from '@chakra-ui/react'
import { css } from 'emotion'
import { Drop } from 'grommet'
import React from 'react'
import { GrClose, GrFilter } from 'react-icons/gr'

import { ReactSelectItem } from '../../../../common/models/react-select-item.model'
import { IndexedItemFilter } from '../../../search/IxSearchModel/IndexedItemFilter'
import { GenericEntityClassSelector } from '../generic-entity-class-selector.component'

export interface EntityFilterControlProps {
  className: string
  updateFilter: (filter: IndexedItemFilter) => void
}

export function EntityFilterControl(props: EntityFilterControlProps) {
  const [includedClasses, setIncludedClasses] = React.useState<ReactSelectItem[]>([])

  const dropRef = React.useRef()
  const [dropOpen, setDropOpen] = React.useState(false)

  React.useEffect(() => {
    const filter: IndexedItemFilter = { classIds: includedClasses.map((x) => x.value) }
    props.updateFilter(filter)
  }, [includedClasses])

  return (
    <Box ref={dropRef as any} className={props.className}>
      <Box
        className={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <Button
          className={css`
            width: 120px;
            height: 44px;
            border-radius: 5px;
            border-style: dotted;
          `}
          size="lg"
          leftIcon={<GrFilter />}
          onClick={() => setDropOpen(true)}
        >
          Filter
        </Button>
        {includedClasses.length > 0 && (
          <Text
            className={css`
              margin-left: 10px;
              font-weight: 500;
            `}
          >
            Include Classes:
          </Text>
        )}
        {includedClasses.map((cls) => {
          return (
            <Button
              key={cls.value}
              className={css`
                border-radius: 10px;
                margin-left: 10px;
              `}
              leftIcon={<GrClose />}
              onClick={() => {
                setIncludedClasses(includedClasses.filter((x) => x.value !== cls.value))
              }}
            >
              {cls.value}
            </Button>
          )
        })}
      </Box>
      {dropOpen && (
        <Drop
          className={css`
            max-width: 400px;
          `}
          align={{ top: 'bottom', left: 'left' }}
          target={dropRef.current}
          elevation="medium"
          onClickOutside={(e: React.MouseEvent<any, any>) => {
            e.stopPropagation()
            setDropOpen(false)
          }}
        >
          <GenericEntityClassSelector
            excludedIds={includedClasses.map((cls) => cls.value)}
            updateSelection={(selected: ReactSelectItem) => {
              const matches = includedClasses.filter((x) => x.value === selected.value).length
              if (matches === 0) setIncludedClasses([...includedClasses, selected])
              setDropOpen(false)
            }}
          />
        </Drop>
      )}
    </Box>
  )
}
