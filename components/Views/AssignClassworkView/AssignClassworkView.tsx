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
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleFormSubmit:(data:any, reset:()=>void)=>void
}
const AssignClassworkView = ({ setModalOpen,handleFormSubmit }: AssignClassworkViewProps) => {
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
        <TextInput
          style={{ width: '300px' }}
          register={{ ...register('attachment', { required: true }) }}
          label="Attachment"
          name="attachment"
          type="file"
          placeholder="Enter topic name"
          Icon={<GrAttachment />}
        />

        <div className="mt-6 text-center">
          <Button type="submit" text="Submit" />
        </div>
      </form>
      <ToastContainer />
    </>
  )
}
export default AssignClassworkView
