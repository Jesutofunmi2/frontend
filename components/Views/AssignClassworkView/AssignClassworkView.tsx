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
      <h1 className="font-bold text-lg mt-3">Add Classwork</h1>
      <hr className="border-gray-300" />
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
            accept="image/*, .pdf,"
            Icon={<GrAttachment />}
          />
          <span className="text-gray-200 text-xs w-[40em] block">Max file size: 1.2MB</span>
          <span className="text-gray-200 text-xs w-[40em] block">
            Accept file type: pdf, jpeg, png, jpg
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
