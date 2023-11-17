import React from 'react'
import styles from './assignClassworkview.module.css'
import { GrAttachment } from 'react-icons/gr'
import Button from '@/components/Button/Button'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TextInput } from '@/components/Form/FormFields/TextInput/TextInput'
import { userData } from '@/services/redux/features/userSlice'
import { ToastContainer, toast } from 'react-toastify'

type Inputs = {
  name: string
  attachment: File | any
}
interface AssignClassworkViewProps {
  handleFormSubmit: (data: any, reset: () => void) => void
}
const AssignClassworkView = ({ handleFormSubmit }: AssignClassworkViewProps) => {
  const searchParams = useSearchParams()
  const classID: any = searchParams.get('id')
  const teacherData = useSelector(userData).currentTeacher?.data!

  // SUBMIT TO API

  const { register, handleSubmit, reset } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleFormSubmit(data, reset)
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <div className={styles.inputwrap}>
          <TextInput
            register={{ ...register('name', { required: true }) }}
            label="Topic Name"
            name="name"
            type="text"
            placeholder="Enter topic name"
          />
        </div>
        <div>
          <TextInput
            style={{ width: '100%' }}
            register={{ ...register('attachment', { required: true }) }}
            label="Attachment"
            name="attachment"
            type="file"
            placeholder="Enter topic name"
            accept="image/*, .pdf, video/* audio/*"
            Icon={<GrAttachment />}
          />
          <span className="text-gray-200 text-sm w-[40em] block">
            (* pdf, zip, audio/mpeg, mpga, mp3, wav, mp4, flv, mov, jpeg, png, jpg *)
          </span>
        </div>

        <div className="mt-6 text-center">
          <Button type="submit" text="Submit" />
        </div>
      </form>
      <ToastContainer />
    </>
  )
}
export default AssignClassworkView
