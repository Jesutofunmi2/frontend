import React, { useState } from 'react'
import styles from './addEditClass.module.css'
import { TextInput } from '../../FormFields/TextInput/TextInput'
import Button from '@/components/Button/Button'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Select from '../../FormFields/Select/DropDown'
// import { useGetLanguages } from '@/services/api/languages'
// import { addClass } from '@/services/api/school/class'
import { useSelector } from 'react-redux'
import { Ilanguage } from '@/types/languages'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

type Inputs = {
  class_room_name: string
  language_id: number
}

interface AddEditClassProps {
  title: string
  handleFormSubmit: (values: any) => void
  languageOptions: { value: number; label: string }[]
}

const AddEditClass = ({ title, handleFormSubmit, languageOptions }: AddEditClassProps) => {
  const { register, handleSubmit, control } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => handleFormSubmit(data)

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.title}>{title}</h3>
        <hr />
        <div className={styles.inputWrap}>
          <TextInput
            register={{ ...register('class_room_name', { required: true }) }}
            // defaultValue={classDetails?.first_name}
            label="Class"
            name="class_room_name"
            type="text"
            placeholder="Class Room Name"
          />

          <Controller
            name="language_id"
            control={control}
            render={({ field }) => (
              <Select
                onChange={(val) => field.onChange(val.value)}
                label="Language"
                defaultValue={'Select'}
                options={languageOptions}
              />
            )}
          />
        </div>
        <div className={styles.btnWrap}>
          <Button maxWidth="150px" type="submit" text="Save" />
        </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default AddEditClass
