import React, { useState } from 'react'
import styles from './classworkView.module.css'
import Button from '../../Button/Button'
import ClassworkCard from '../../Card/ClassworkCard/ClassworkCard'
import Link from 'next/link'
import AssignModuleCard from '@/components/Card/AssignModuleCard/AssignModuleCard'
// import { useDeleteClasswork, useGetClasswork } from '@/services/APIs/classwork'
import { useSearchParams } from 'next/navigation'
import { Loader } from '@/components/Loader/Loader'
import { deleteModule, useGetAssignedModule } from '@/services/api/module'
import { active } from 'sortablejs'
import AddClasswork from '@/components/Form/Forms/AddClassWork/page'
import { addClasswork, deleteClasswork, useGetClasswork } from '@/services/api/classwork'
import AddClassworkPage from '@/components/Form/Forms/AddClassWork/page'
import Modal from '@/components/Modal/Modal'
import { useSelector } from 'react-redux'
import { userData } from '@/services/redux/features/userSlice'
import { ToastContainer, toast } from 'react-toastify'

const ClassworkView = () => {
  const searchParams = useSearchParams()
  const [modalOpen, setModalOpen] = useState(false)
  const teacherData = useSelector(userData).currentTeacher?.data!
  const classID = Number(searchParams.get('id'))
  const { data: assignedModule } = useGetAssignedModule({
    school_id: teacherData?.school.id,
    teacher_id: `${teacherData?.teacher_id}`,
  })
  const { data: classworkData, mutate } = useGetClasswork(
    teacherData?.teacher_id,
    teacherData?.school?.id,
    classID
  )
  const handleFormSubmit = async (data: any, reset: () => void) => {
    if (data.attachment[0].size > 1000000) {
      toast.error('File is too large', {
        position: toast.POSITION.TOP_RIGHT,
      })
      return
    }
    let formData: any = new FormData()
    formData.append('media_url', data.attachment[0])
    formData.append('teacher_id', teacherData?.teacher_id)
    formData.append('class_id', classID)
    formData.append('school_id', teacherData?.school?.id)
    formData.append('name', data.name)

    let res = await addClasswork(formData)
    if (res) {
      setModalOpen(false)
      reset()
      mutate()
    }
  }
  const handleModuleDelete = async (id: number) => {
    let payload = {
      schoolID: teacherData?.school_id,
      teacherID: teacherData?.teacher_id,
      id: id,
    }
    let res = await deleteModule(payload)
    if (res) {
      mutate()
    }
  }

  // Delete Class function
  const handleDeleteClasswork = async (param: any) => {
    let payload = {
      name: param?.name,
      teacherID: teacherData?.teacher_id,
      schoolID: teacherData?.school?.id,
      classID: classID,
    }
    let res = await deleteClasswork(payload)
    if (res) {
      mutate()
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardWrap}>
          <p className={styles.cardTitle}>CLASSWORK</p>
          <div className={styles.buttonWrap}>
            <Button handleClick={() => setModalOpen(true)} text="Add Classwork" />
          </div>
          <div className={styles.cards}>
            {classworkData?.length ? (
              classworkData?.map((item: any) => (
                <ClassworkCard
                  data={item}
                  key={item.id}
                  handleDeleteClasswork={handleDeleteClasswork}
                />
              ))
            ) : classworkData?.length === 0 ? (
              <span className={styles.noItem}>No Classwork</span>
            ) : (
              <Loader />
            )}
          </div>
        </div>

        <div className={styles.cardWrap}>
          <p className={styles.cardTitle}>MODULE CLASSWORK</p>
          <div className={styles.cards}>
            {assignedModule?.length ? (
              assignedModule?.map((module: any) => (
                <AssignModuleCard
                  title={module.title}
                  module={module}
                  key={module.id}
                  handleModuleDelete={handleModuleDelete}
                />
              ))
            ) : assignedModule?.length === 0 ? (
              <span className={styles.noItem}>No Module</span>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>

      <Modal open={modalOpen} setOpen={setModalOpen}>
        <AddClassworkPage handleFormSubmit={handleFormSubmit} setModalOpen={setModalOpen} />
      </Modal>
    </>
  )
}

export default ClassworkView
