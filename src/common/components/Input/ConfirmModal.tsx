import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import React from 'react'

export interface ConfirmModalProps {
  id?: string
  heading: string
  description: string
  okCallback: () => void
  cancelCallback: () => void
}

export function ConfirmModal(props: ConfirmModalProps) {
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
            <Text>{props.description}</Text>
            <ModalFooter>
              <Button style={{ marginRight: '10px' }} onClick={() => props.okCallback()}>
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
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}
