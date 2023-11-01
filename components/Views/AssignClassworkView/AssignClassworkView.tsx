import React from 'react'
import styles from './assignClassworkview.module.css'
import { GrAttachment } from 'react-icons/gr'
import { addClasswork } from '@/services/api/classwork'
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

const AssignClassworkView = () => {
  const searchParams = useSearchParams()
  const classID: any = searchParams.get('id')
  const teacherData = useSelector(userData).currentTeacher?.data!

  // SUBMIT TO API
  const handleFormSubmit = async (data: any, reset: () => void) => {
    if (data.attachment[0].size > 100000) {
      toast.error('File is too large', {
        position: toast.POSITION.TOP_RIGHT,
      })
      return
    }
    let formData = new FormData()
    formData.append('media_url', data.attachment[0])
    formData.append('teacher_id', teacherData?.teacher_id)
    formData.append('class_id', classID)
    formData.append('school_id', teacherData?.school?.id)
    formData.append('name', data.name)
    let res = await addClasswork(formData)
    if (res) {
      reset()
    }
  }

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
          Icon={< GrAttachment />}
        />

        <Button width="200px" type="submit" text="Submit" />
      </form>
      <ToastContainer />
    </>
  )
}
export default AssignClassworkView
