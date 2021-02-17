import { css } from 'emotion'
import { Button, Popover, PopoverContent } from '@chakra-ui/react'
import React from 'react'

export interface DropMenuProps {
  anchorRef: any
  closeMenu: (e: React.MouseEvent) => void
  items: DropMenuItemProps[]
  visible: boolean
}

export interface DropMenuItemProps {
  label: string
  icon?: JSX.Element
  action: () => void
  closeMenu?: (e: React.MouseEvent) => void
}

function DropMenuItem(props: DropMenuItemProps) {
  return (
    <Button
      className={css`
        padding: 10px;
      `}
      leftIcon={props.icon == null ? undefined : props.icon}
      onClick={(e) => {
        props.action()
        props.closeMenu && props.closeMenu(e)
      }}
    >
      {props.label}
    </Button>
  )
}

export const dropToggleMemory = {
  justToggledOff: false,
}

export function setDropToggleMemoryTimer() {
  dropToggleMemory.justToggledOff = true
  setTimeout(() => {
    dropToggleMemory.justToggledOff = false
  }, 100)
}

export function GenericDropMenu(props: DropMenuProps) {
  if (!props.anchorRef || !props.anchorRef.current || !props.visible) {
    return <></>
  }
  return (
    <Popover
      id="user-menu-drop"
      initialFocusRef={props.anchorRef.current}
      placement="right-start"
      // onClickOutside={(e: React.MouseEvent) => {
      //   if (dropToggleMemory.justToggledOff) return
      //   setDropToggleMemoryTimer()
      //   // This doesn't currently work...but leaving it in here for now.  Having to use drop toggle memory as a crutch.
      //   e.stopPropagation()
      //   props.closeMenu(e)
      // }}
    >
      <PopoverContent>
        {props.items.map((innerProps, ix) => {
          return (
            <DropMenuItem
              key={ix}
              {...{
                closeMenu: (e: React.MouseEvent) => {
                  props.closeMenu(e)
                },
                ...innerProps,
              }}
            />
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
