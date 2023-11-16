import React, { useState } from 'react'
import styles from './classworkView.module.css'
import Button from '../../Button/Button'
import ClassworkCard from '../../Card/ClassworkCard/ClassworkCard'
import Link from 'next/link'
import AssignModuleCard from '@/components/Card/AssignModuleCard/AssignModuleCard'
// import { useDeleteClasswork, useGetClasswork } from '@/services/APIs/classwork'
import { useSearchParams } from 'next/navigation'
import { Loader } from '@/components/Loader/Loader'
import { addAssignModule, deleteModule, useGetAssignedModule } from '@/services/api/module'
import { active } from 'sortablejs'
import AddClasswork from '@/components/Form/Forms/AddClassWork/page'
import { addClasswork, deleteClasswork, useGetClasswork } from '@/services/api/classwork'
import AddClassworkPage from '@/components/Form/Forms/AddClassWork/page'
import Modal from '@/components/Modal/Modal'
import { useSelector } from 'react-redux'
import { userData } from '@/services/redux/features/userSlice'
import { ToastContainer, toast } from 'react-toastify'
import NotFound from '@/components/NotFound/NotFound'

const ClassworkView = () => {
  const searchParams = useSearchParams()
  const [toggle, setToggle] = useState('Assign Classwork')
  const [modalOpen, setModalOpen] = useState(false)
  const teacherData = useSelector(userData).currentTeacher?.data!
  const classID = Number(searchParams.get('id'))
  const { data: assignedModule } = useGetAssignedModule({
    school_id: teacherData?.school.id,
    teacher_id: `${teacherData?.teacher_id}`,
  })
  const {
    data: classworkData,
    mutate,
    error,
  } = useGetClasswork(teacherData?.teacher_id, teacherData?.school?.id, classID)

  const handleToggle = (toggle: string) => {
    setToggle(toggle)
  }

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
  const handleModuleSubmit = async (
    selectedModules: {
      id: number
      value: string
      label: string
    }[],
    data: {
      module: ''
      data: { deadline: string; attempts: ''; time: ''; mark: '' }[]
    },
    reset: (value:any) => void
  ) => {
    const inputData = data.data.map((item, index) => {
      return {
        module: selectedModules[index].id,
        deadline: item.deadline,
        time: item.time,
        no_attempt: item.attempts,
        mark: item.mark,
      }
    })

    let formdata = {
      school_id: teacherData.school.id,
      teacher_id: teacherData.teacher_id,
      class_id: classID,
      data: inputData,
    }
    let res = await addAssignModule(formdata)
    if (res) {


      mutate()
    }
    setModalOpen(false)
    reset({
      module: '',
      data: [],
    })
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
            ) : error ? (
              <NotFound text={'Server Error'} />
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
            ) : error ? (
              <NotFound text={'Server Error'} />
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>

      <Modal open={modalOpen} setOpen={setModalOpen}>
        <AddClassworkPage
          toggle={toggle}
          handleToggle={handleToggle}
          handleFormSubmit={handleFormSubmit}
          handleModuleSubmit={handleModuleSubmit}
        />
      </Modal>
    </>
  )
}

export default ClassworkView
