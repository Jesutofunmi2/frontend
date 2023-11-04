'use client'

import React, { useState } from 'react'
import styles from './page.module.css'
import SelectImage from '@/components/SelectImage/SelectImage'
import { TextInput } from '@/components/Form/FormFields/TextInput/TextInput'
import Button from '@/components/Button/Button'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

type Inputs = {
  school_name: string
  principal_name: string
  username: string
  email: string
  phonenumber: number
  image_url: File
}
const EditProfile = () => {
  const [preview, setPreview] = useState<string | any | null>(null)
  const [file, setFile] = useState<string | any | null>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    
  }
  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.title}>Edit Profile</h3>
        <div>
          <div className={styles.imageWrap}>
            <Controller
              name="image_url"
              control={control}
              render={({ field }) => (
                <SelectImage
                  register={{ ...register('image_url', { required: true }) }}
                  name="image_url"
                  setFile={setFile}
                  preview={preview}
                  setPreview={setPreview}
                  errors={errors}
                  clearErrors={clearErrors}
                />
              )}
            />
          </div>

          <div className={styles.details}>
            <TextInput
              register={{ ...register('school_name', { required: true }) }}
              type="text"
              label="School Name"
              name="school_name"
              placeholder="School Name"
            />
            <TextInput
              register={{ ...register('principal_name', { required: true }) }}
              type="text"
              label="Principal Name"
              name="principal_name"
              placeholder="Principal Name"
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
          </div>
          <hr />
          <div className={styles.btnWrap}>
            <Button text="Save" type="submit"  />
          </div>
        </div>
      </form>
    </>
  )
}

export default EditProfile
