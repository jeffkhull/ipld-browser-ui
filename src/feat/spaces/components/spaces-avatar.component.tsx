import { Button } from '@chakra-ui/react'
import React from 'react'
import { NamespaceService } from '../services/namespace.service'
import { spaceMutators, spaceSelectors, useSpacesStore } from '../stores/spaces.store'
import { SpaceSelectModal } from './space-select-modal.component'
import { css } from 'emotion'
import { GrCube } from 'react-icons/gr'

const styleNavlink = css`
  height: 4rem;
  padding: 12px;
  width: 100% !important;
`
const styleNavIcon = css`
  margin-right: 10px;
`
export function SpacesAvatar(props: { isCollapsed: boolean }) {
  const setCurrentSpaceId = useSpacesStore(spaceMutators.setCurrentSpaceId)
  const setAvailableSpaces = useSpacesStore(spaceMutators.setAvailableSpaces)
  const currentSpace = useSpacesStore(spaceSelectors.currentSpace)

  const [spaceSelectOpen, setSpaceSelectOpen] = React.useState(false)

  const getAvailableSpaces = React.useCallback(async () => {
    const res = await NamespaceService.getAvailableForUser()
    setCurrentSpaceId(res[0]?._id || '')
    setAvailableSpaces(res)
  }, [])

  React.useEffect(() => {
    void getAvailableSpaces()
  }, [])

  return (
    <>
      {spaceSelectOpen && <SpaceSelectModal closeModal={() => setSpaceSelectOpen(false)} />}
      <Button
        marginTop="0.5rem"
        size="large"
        className={styleNavlink}
        leftIcon={<GrCube className={styleNavIcon} size="24px" />}
        onClick={() => setSpaceSelectOpen(true)}
        variant="ghost"
        fill="horizontal"
      >
        {props.isCollapsed ? undefined : currentSpace?.name || '[Space Select]'}
      </Button>
    </>
  )
}
