import React, { useState } from 'react'
import styles from './addEditClass.module.css'
import { TextInput } from '../../FormFields/TextInput/TextInput'
import Button from '@/components/Button/Button'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Select from '../../FormFields/Select/DropDown'
import { useGetLanguages } from '@/services/api/languages'
import { ILanguage } from '@/types/languages.'
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
}

const AddEditClass = ({
  title,
  classDetails,
  schoolID,
  mutate,
  setModalOpen,
}: AddEditClassProps) => {
  const handleFormSubmit = async (data: any, reset: () => void) => {
    if (classDetails) {
      // editClass()
    } else {
      // mutate({ ...allClassesData, values })
      let res = await addClass(Number(schoolID), Number(data.language_id), data.class_room_name)
      if (res) {
        mutate()
        reset()
      }
    }
    mutate()
    setModalOpen(false)
  }
  const { register, handleSubmit, control, reset } = useForm<Inputs>({
    defaultValues: {
      class_room_name: ' ',
      language_id: 0,
    },
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => handleFormSubmit(data, reset)

  const { data: languages } = useGetLanguages()
  if (!languages) return
  const languageOptions = languages.map((item: ILanguage) => {
    return { value: item.id, label: item.name, disabled: item.status === 1 ? false : true }
  })
  console.log(languages)
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
          <Button type="submit" text="Save" />
        </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default AddEditClass
