import { Box, Heading, List, ListItem } from '@chakra-ui/react'
import React from 'react'
import { NotImplementedException } from '../../../../common/exceptions/not-implemented.exception'
import { widget33 } from '../styles'

export function ItemsSummaryPanel() {
  const [collCount, setCollCount] = React.useState(0)
  const getSummaryInfo = React.useCallback(async () => {
    // todo - not implemented
    // throw new NotImplementedException('Method')
    // const coll = await repoMgr.getExistingCollections()
    // console.log(`collections `, coll)
    // setCollCount(coll.length)
  }, [])
  React.useEffect(() => {
    void getSummaryInfo()
  }, [])

  return (
    <Box className={widget33} bgColor="gray.50">
      <Heading size="lg">Items Summary</Heading>
      <List>
        <ListItem>Collection Count: {collCount}</ListItem>
      </List>
    </Box>
  )
}
