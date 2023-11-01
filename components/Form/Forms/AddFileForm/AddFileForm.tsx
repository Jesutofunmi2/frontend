import React, { useState, useEffect } from 'react'
import styles from './addFileForm.module.css'
import Button from '@/components/Button/Button'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import Date from '../../FormFields/Date/date'
import { TextInput } from '../../FormFields/TextInput/TextInput'

type Inputs = {
  date: Date
  topic: string
  mark: string
  file: File
}

interface AddFileProps {
  handleAddFile: (formdata:any) => void

}
const AddFileForm = ({ handleAddFile }: AddFileProps) => {
  // const [formdata, setFormdata] = useState({
  //   date: '',
  //   topic: '',
  //   no_attempt: 0,
  //   mark: 0,
  //   file: {},
  // })

  // HANDLE INPUT FIELDS
  // const handleChange = (e) => {
  //   const data = { ...formdata }
  //   data[e.target.name] = e.target.value
  //   setFormdata(data)
  // }

  // HANDLE FILE CHANGE
  // const handleFile = (e: any) => {
  //   setFormdata({ ...formdata, file: e.target.files[0] })
  // }

  // const handleAdd = (e) => {
  //   console.log(formdata)
  //   e.preventDefault()
  //   handleClick(formdata)
  //   // setFormdata({
  //   //   date: "",
  //   //   topic: 0,
  //   //   no_attempt: 0,
  //   //   mark: 0,
  //   //   file: {},
  //   // });
  // }
  const { register, handleSubmit, control } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <hr />

        <div className={styles.inputWrap}>
          <div className={styles.attemptWrap}>
            <TextInput
              register={{ ...register('date', { required: true }) }}
              label="Date"
              name="date"
              type="date"
              placeholder="Enter Date"
            />
          </div>

          <div className={styles.attemptWrap}>
            <TextInput
              register={{ ...register('topic', { required: true }) }}
              label="Topic"
              name="topic"
              type="text"
              placeholder="Enter topic"
            />
          </div>

          <div>
            <TextInput
              register={{ ...register('file', { required: true }) }}
              label="File Upload"
              name="file"
              type="file"
              // placeholder="Enter topic"
            />
          </div>

          {/* Mark */}
          <>
            <TextInput
              register={{ ...register('mark', { required: true }) }}
              label="Mark"
              name="mark"
              type="number"
              placeholder="Mark"
            />
          </>
        </div>

        <div className={styles.btn}>
          <Button text="Add" width="200px" />
        </div>
      </form>

      <ToastContainer />
    </>
  )
}

export default AddFileForm
