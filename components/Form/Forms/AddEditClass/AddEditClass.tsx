import React, { useState } from 'react'
import styles from './addEditClass.module.css'
import { TextInput } from '../../FormFields/TextInput/TextInput'
import Button from '@/components/Button/Button'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Select from '../../FormFields/Select/DropDown'
import { useGetLanguages } from '@/services/api/languages'
import { ILanguage } from '@/types/languages'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { addClass } from '@/services/api/school/class'

type Inputs = {
  class_room_name: string
  language_id: number
}

interface AddEditClassProps {
  title: string
  schoolID: number
  setModalOpen: any
  mutate: any
  classDetails: any
  teacherID: number
}

const AddEditClass = ({
  title,
  classDetails,
  schoolID,
  mutate,
  setModalOpen,
  teacherID,
}: AddEditClassProps) => {
  const handleFormSubmit = async (data: any) => {
    setModalOpen(false)
    if (classDetails) {
      // editClass()
    } else {
      let res = await addClass(
        Number(schoolID),
        teacherID,
        Number(data.language_id),
        data.class_room_name
      )

      mutate()
    }
  }
  const { register, handleSubmit, control, reset } = useForm<Inputs>({
    defaultValues: {
      class_room_name: ' ',
      language_id: 0,
    },
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleFormSubmit(data),
      reset({
        class_room_name: '',
        language_id: 0,
      })
  }

  const { data: languages } = useGetLanguages()
  if (!languages) return
  const languageOptions = languages.map((item: ILanguage) => {
    return { value: item.id, label: item.name, disabled: item.status === 1 ? false : true }
  })
  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.title}>{title}</h3>
        <hr />
        <div className="grid grid-cols-2 gap-8 mt-8">
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
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={(val) => onChange(val.value)}
                label="Language"
                value={languageOptions.find((c) => c.value === value) || value}
                defaultValue={'Select'}
                options={languageOptions}
              />
            )}
          />
        </div>
        <div className={styles.btnWrap}>
          <Button type="submit" text="Save" />
        </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default AddEditClass
