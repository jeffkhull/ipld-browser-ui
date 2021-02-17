import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import isHotkey from 'is-hotkey'
import React from 'react'

const HotkeyMap = new Map<string, string>()
HotkeyMap.set('mod+enter', 'saveAndQuit')

export interface SingleTextInputModalProps {
  id: string
  heading: string
  hintText: string
  okCallback: (val: string) => void
  cancelCallback: () => void
}

export function SingleTextInputModal(props: SingleTextInputModalProps) {
  const [textVal, setTextVal] = React.useState('')

  const layerOnKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      HotkeyMap.forEach((value, key) => {
        if (isHotkey(key, event as any)) {
          event.preventDefault()
          props.okCallback(textVal)
        }
      })
    },
    [props.okCallback, textVal],
  )

  return (
    <Modal
      id={props.id}
      isOpen={true}
      onEsc={() => {
        props.cancelCallback()
      }}
      onClose={() => {
        props.cancelCallback()
      }}
    >
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>{props.heading}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Input
                placeholder={props.hintText}
                value={textVal}
                onChange={(e) => setTextVal(e?.target.value)}
                autoFocus
              />
              <ModalFooter>
                <Button style={{ marginRight: '10px' }} onClick={() => props.okCallback(textVal)}>
                  ok
                </Button>
                <Button
                  onClick={() => {
                    props.cancelCallback()
                  }}
                >
                  cancel
                </Button>
              </ModalFooter>
            </Box>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}
