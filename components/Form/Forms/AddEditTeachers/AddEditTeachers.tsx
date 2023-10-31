import React, { useState } from 'react'
import styles from './addEditTeachers.module.css'
import {TextInput} from '../../FormFields/TextInput/TextInput'
import Button from '@/components/Button/Button'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SelectImage from '@/components/SelectImage/SelectImage'
import { IPayloadTeacher } from '@/types/teacher'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'


type Inputs = {
  name: string
  email:string
}

interface AddEditTeacherProps {
  payloadData: IPayloadTeacher
  setPayloadData: React.Dispatch<React.SetStateAction<IPayloadTeacher>>
  handleFormSubmit: (e: any) => void
  teacherDetails: any
  title: string
  setFile: React.Dispatch<React.SetStateAction<File | string>>
}
const AddEditTeachers = ({
  payloadData,
  setPayloadData,
  handleFormSubmit,
  teacherDetails,
  title,
  setFile,
}: AddEditTeacherProps) => {
  // HANDLE INPUT FIELDS
  // const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   const data = { ...payloadData }
  //   data[e.target.name] = e.target.value
  //   setPayloadData(data)
  // }

  // GENDER SELECT OPTIONS
  const genderOptions = ['Male', 'Female']

  // COUNTRY SELECT OPTIONS
  const countryOptions = ['Nigeria']

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => handleFormSubmit(data)

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)} >
        <h3 className={styles.title}>{title}</h3>
        <hr />
        <div className={styles.imageWrap}>
          <SelectImage name="image_url" setFile={setFile} />
        </div>
        <div className={styles.inputWrap}>
          <TextInput
           register={{ ...register('name', { required: true }) }}
            // defaultValue={teacherDetails?.name}
            type="text"
            label="Name"
            name="name"
            placeholder="Name"
          />
          <TextInput
           register={{ ...register('email', { required: true }) }}
            // defaultValue={teacherDetails?.email}
            label="Email"
            name="email"
            type="email"
            placeholder="Email"

          />
        </div>
        <div className={styles.btnWrap}>
          <Button type="submit" maxWidth="150px" text="Save" />
        </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default AddEditTeachers
