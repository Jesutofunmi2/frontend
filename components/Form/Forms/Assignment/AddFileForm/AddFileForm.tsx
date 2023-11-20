import React from 'react'
import styles from './addFileForm.module.css'
import Button from '@/components/Button/Button'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TextInput } from '../../../FormFields/TextInput/TextInput'

type Inputs = {
  date: Date
  topic: string
  mark: string
  attachment: File
}

interface AddFileProps {
  handleAddFileAssignment: (formdata: any, reset: () => void) => void
}
const AddFileForm = ({ handleAddFileAssignment }: AddFileProps) => {
  const { register, handleSubmit, reset } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => handleAddFileAssignment(data, reset)

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <h1 className="font-bold text-lg">Add File Assignment</h1>
        <hr  />

        <div className="grid grid-cols-2 gap-8 mt-10">
          <TextInput
            register={{ ...register('date', { required: true }) }}
            label="Date(Select date after today)"
            name="date"
            type="date"
            placeholder="Enter Date"
          />

          <TextInput
            register={{ ...register('topic', { required: true }) }}
            label="Topic"
            name="topic"
            type="text"
            placeholder="Enter topic"
          />

          <div>
            <TextInput
              register={{ ...register('attachment', { required: true }) }}
              label="File Upload"
              name="attachment"
              type="file"
              accept="image/png, image/jpeg, .pdf, video/* audio/*"
              placeholder="Add Attachment"
            />
            <span className="text-gray-200 text-sm block">
              (* pdf, zip, audio/mpeg, mpga, mp3, wav, mp4, flv, mov, jpeg, png, jpg *)
            </span>
          </div>
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
          <Button text="Submit" type="submit" />
        </div>
      </form>

      <ToastContainer />
    </>
  )
}

export default AddFileForm
