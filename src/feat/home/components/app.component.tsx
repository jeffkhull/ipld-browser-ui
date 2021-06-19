import './app/app.styles.css'
import './app/spinners.css'

import { ChakraProvider } from '@chakra-ui/react'
import { Grommet, ResponsiveContext } from 'grommet'
import React from 'react'

import * as appThemes from '../../../common/theme/appTheme'
import {
  notifMutators,
  notifSelectors,
  useNotificationStore,
} from '../../notifications/stores/NotificationStore'
import { SearchService } from '../../search/services/search.service'
import { userStoreSelectors, useUserStore } from '../../user/stores/UserStore'
import { AppDisplayContainer } from './app/app-container.component'
import { LoadingSpinner } from './app/loading-spinner.component'

// theme https://www.canva.com/learn/website-color-schemes/ number 23
// color picker https://www.w3schools.com/colors/colors_picker.asp
export function App(props: { path: string }) {
  const numServerWaiters = useNotificationStore(notifSelectors.numWaiters)
  const user = useUserStore(userStoreSelectors.user)
  const incrementWaiters = useNotificationStore(notifMutators.incrementWaiters)
  const decrementWaiters = useNotificationStore(notifMutators.decrementWaiters)

  const initSearchIndex = React.useCallback(async () => {
    await SearchService.initAllCaches()
  }, [])

  React.useEffect(() => {
    void initSearchIndex()

    incrementWaiters()
    setTimeout(() => {
      decrementWaiters()
    }, 500)
  }, [])

  React.useEffect(() => {
    // On startup, refresh indexes
    if (user.defaultNamespaceId !== null && user.defaultNamespaceId !== '') {
      // void IndexStore.GetLatestEntNameIndexes([user.defaultNamespaceId])
      // void IndexStore.GetLatestRelNameIndexes([user.defaultNamespaceId])
      // void IndexStore.GetLatestClsNameIndexes([user.defaultNamespaceId])
    }
  }, [user])

  return (
    <ChakraProvider resetCSS>
      <Grommet
        style={{
          opacity: numServerWaiters === 0 ? 1 : 0.4,
          transition: 'opacity 1s ease-in-out',
        }}
        id="grommet-box"
        theme={appThemes.appTheme as any}
        full
      >
        <LoadingSpinner
          opacity={numServerWaiters === 0 ? 0 : 1}
          transition="opacity 1s ease-in-out"
        />
        <ResponsiveContext.Consumer>
          {(size) => (
            <>
              {size === 'small' && <div>This website does not yet support mobile devices</div>}
              {size !== 'small' && <AppDisplayContainer />}
            </>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    </ChakraProvider>
  )
}
