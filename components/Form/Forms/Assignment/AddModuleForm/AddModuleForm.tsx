import React, { useState, useEffect } from 'react'
import styles from './addModuleForm.module.css'
import Button from '@/components/Button/Button'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { TextInput } from '../../../FormFields/TextInput/TextInput'

type Inputs = {
  date: Date
  time: string
  no_attempt: number
  mark: number
  file: File
}
interface AddModuleFormProps {
  handleModuleAssignment: (values: any) => void
  file?: any
}
const AddModuleForm = ({ handleModuleAssignment, file }: AddModuleFormProps) => {
  const { register, handleSubmit, control } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => handleModuleAssignment(data)

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        {/* <h3 className={styles.title}>Assign Module</h3> */}
        <hr />

        <div className={styles.inputWrap}>
          <TextInput
            register={{ ...register('date', { required: true }) }}
            label="Date"
            type="date"
            name="date"
            placeholder="Date"
          />

          <TextInput
            register={{ ...register('time', { required: true }) }}
            label="Time(mins)"
            type="number"
            name="time"
            placeholder="Minutes"
          />

          <TextInput
            register={{ ...register('no_attempt', { required: true }) }}
            label="No of attempts"
            type="number"
            name="no_attempt"
            placeholder="No of attempts"
          />

          <TextInput
            register={{ ...register('mark', { required: true }) }}
            label="Mark"
            type="number"
            name="mark"
            placeholder="Mark"
            // className={styles.Input}
            // onChange={(e) => handleChange(e)}
            // required
          />

          {file ? (
            <div>
              <TextInput
                register={{ ...register('file', { required: true }) }}
                label="Attachments"
                type="file"
                name="file"
                placeholder="Attachments"
              />
              {/* <input type="file" name="file" id="" onChange={(e) => handleChange(e)} required /> */}
            </div>
          ) : null}
        </div>

        <div className={styles.btn}>
          <Button text="Add" />
        </div>
      </form>

      <ToastContainer />
    </>
  )
}

export default AddModuleForm
