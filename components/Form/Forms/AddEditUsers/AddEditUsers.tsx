import React from 'react'
import styles from './addEditUsers.module.css'
import { TextInput } from '../../FormFields/TextInput/TextInput'
import Button from '@/components/Button/Button'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  name: string
  username: string
  email: string
  password: string
}
const AddEditUsers = () => {
  const { register, handleSubmit } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.title}>Add User</h3>
        <hr />

        <div className={styles.inputWrap}>
          <TextInput
            register={{ ...register('name', { required: true }) }}
            type="text"
            label="Name"
            name="name"
            placeholder="Name"
          />
          <TextInput
            register={{ ...register('username', { required: true }) }}
            type="text"
            label="Username"
            name="username"
            placeholder="Username"
          />
          <TextInput
            register={{ ...register('email', { required: true }) }}
            type="email"
            label="Email"
            name="email"
            placeholder="Email"
          />
          <TextInput
            register={{ ...register('password', { required: true }) }}
            type="password"
            label="Password"
            name="password"
            placeholder="Enter Password"
          />
          <div className={styles.btnWrap}>
            <Button type="submit" maxWidth="150px" text="Save" />
          </div>
        </div>
      </form>
    </>
  )
}

export default AddEditUsers
