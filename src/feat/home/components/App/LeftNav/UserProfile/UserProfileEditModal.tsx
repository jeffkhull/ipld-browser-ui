import { Button, FormLabel, Input } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { GenericModal } from '../../../../../../common/components'
import { NotImplementedException } from '../../../../../../common/exceptions/not-implemented.exception'
import { blankUser, UserModel } from '../../../../../user/models/user.model'
import { userStoreSelectors, useUserStore } from '../../../../../user/stores/UserStore'

export interface UserProfileEditModalProps {
  cancelCallback: () => void
  okCallback: (formValues: UserModel) => void
}

export function UserProfileEditModal(props: UserProfileEditModalProps) {
  const [formValue, setFormValue] = React.useState<UserModel>(blankUser)
  const user = useUserStore(userStoreSelectors.user)

  // Must rehydrate user if it already exists.
  React.useEffect(() => {
    console.log(`user is`, user)
    setFormValue(user)
  }, [])

  return (
    <GenericModal
      title="Edit Profile"
      cancelCallback={props.cancelCallback}
      okCallback={() => {
        throw new NotImplementedException('Method')
        props.okCallback(formValue)
      }}
      height="40rem"
      width="40rem"
      showCancelButton
    >
      <Formik
        initialValues={blankUser}
        onSubmit={(values) => {
          console.log(`got values`, values)
        }}
      ></Formik>
      <Form>
        <Field name="userName">
          <FormLabel>User Name</FormLabel>
          <Input placeholder="User Name" />
        </Field>
        <Field name="email">
          <FormLabel>Email</FormLabel>
          <Input placeholder="me@me.com" />
        </Field>
        <Field name="firstName">
          <FormLabel>First Name</FormLabel>
          <Input placeholder="" />
        </Field>
        <Field name="lastName">
          <FormLabel>Last Name</FormLabel>
          <Input placeholder="" />
        </Field>
        <Button type="submit">Submit</Button>
      </Form>
    </GenericModal>
  )
}
