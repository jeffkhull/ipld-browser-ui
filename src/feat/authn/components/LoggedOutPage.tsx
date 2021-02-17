import React from 'react'
import { Button, Box, Text } from '@chakra-ui/react'
import * as Reach from '@reach/router'
import { css } from 'emotion'

export interface LoggedOutPageProps {
  path?: string
}

export function LoggedOutPage(props: LoggedOutPageProps) {
  return (
    <Box
      className={css`
        max-width: 300px;
      `}
    >
      <Text>You have been logged out</Text>
      <Button
        onClick={() => {
          void Reach.navigate('/login')
        }}
      >
        Log in again
      </Button>
    </Box>
  )
}
