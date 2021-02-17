import { Box, Text } from '@chakra-ui/react'
import { css } from 'emotion'
import { Drop } from 'grommet'
import React from 'react'

export interface OutboundRelationCreateDropProps {
  dropRef: any
  onClickOutside: (e: React.MouseEvent) => void
}

export function OutboundRelationCreateDrop(props: OutboundRelationCreateDropProps) {
  React.useEffect(() => {
    console.log(`OutboundRelationCreateDrop. dropref current is `, props.dropRef.current)
  }, [props.dropRef])

  if (!props.dropRef.current) return <></>

  return (
    <Drop
      id="search-results-drop"
      align={{ top: 'bottom', left: 'left' }}
      target={props.dropRef.current}
      elevation="medium"
      onClickOutside={(e: React.MouseEvent<any, any>) => {
        e.stopPropagation()
        props.onClickOutside(e)
      }}
    >
      <Box
        className={css`
          padding: 15px;
        `}
      >
        <Text>create er drop</Text>
      </Box>
    </Drop>
  )
}
