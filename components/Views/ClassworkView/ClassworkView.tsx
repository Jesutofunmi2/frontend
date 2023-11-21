import React, { useState } from 'react'
import styles from './classworkView.module.css'
import Button from '../../Button/Button'
import ClassworkCard from '../../Card/ClassworkCard/ClassworkCard'
import AssignModuleCard from '@/components/Card/AssignModuleCard/AssignModuleCard'
import { useSearchParams } from 'next/navigation'
import { Loader } from '@/components/Loader/Loader'
import { addAssignModule, deleteModule, useGetAssignedModule } from '@/services/api/module'
import { addClasswork, deleteClasswork, useGetClasswork } from '@/services/api/classwork'
import Modal from '@/components/Modal/Modal'
import { useSelector } from 'react-redux'
import { userData } from '@/services/redux/features/userSlice'
import { toast } from 'react-toastify'
import NotFound from '@/components/NotFound/NotFound'
import AssignModuleView from '../AssignModuleView/AssignModuleView'
import AssignClassworkView from '../AssignClassworkView/AssignClassworkView'

const ClassworkView = () => {
  const searchParams = useSearchParams()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedButton, setSelectedButton] = useState('')
  const teacherData = useSelector(userData).currentTeacher?.data!
  const classID = Number(searchParams.get('id'))
  const { data: assignedModule, mutate: mutateAssignedModule } = useGetAssignedModule({
    school_id: teacherData?.school.id,
    teacher_id: `${teacherData?.teacher_id}`,
  })
  const {
    data: classworkData,
    mutate,
    error,
  } = useGetClasswork(teacherData?.teacher_id, teacherData?.school?.id, classID)

  const handleToggle = (selectedButton: string) => {
    setModalOpen(true)
    setSelectedButton(selectedButton)
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
    await addClasswork(formData)
    setModalOpen(false)
    reset()
    mutate()
  }

  const handleModuleSubmit = async (data: any, reset: (value: any) => void) => {
    let formdata = {
      school_id: teacherData.school.id,
      teacher_id: teacherData.teacher_id,
      class_id: classID,
      data: [{ ...data, time: Math.ceil(Number(data.time.split(':')[0])), notification: true }],
    }
    await addAssignModule(formdata)
    mutateAssignedModule()
    setModalOpen(false)
    reset({
      module: '',
      deadline: '',
      time: '',
      no_attempt: '',
      mark: '',
    })
  }

  const handleModuleDelete = async (id: number) => {
    let payload = {
      school_id: Number(teacherData?.school.id),
      teacher_id: String(teacherData?.teacher_id),
      id: Number(id),
    }
    let res = await deleteModule(payload)
    if (res) {
      mutateAssignedModule()
    }
  }

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
            <Button
              handleClick={() => {
                handleToggle('assign-classwork')
              }}
              text="Assign File"
            />
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
          <div className={styles.buttonWrap}>
            <Button
              handleClick={() => {
                handleToggle('assign-module')
              }}
              text="Assign Module"
            />
          </div>
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
        {selectedButton === 'assign-classwork' ? (
          <AssignClassworkView handleFormSubmit={handleFormSubmit} />
        ) : (
          <AssignModuleView handleModuleSubmit={handleModuleSubmit} />
        )}
      </Modal>
    </>
  )
}

export default ClassworkView
