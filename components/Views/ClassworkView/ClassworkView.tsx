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
import AssignModuleView from '../AssignModuleView/AssignModuleView'
import AssignClassworkView from '../AssignClassworkView/AssignClassworkView'
import { IModuleAssignmentPayload } from '@/types/assignment'

const ClassworkView = () => {
  const searchParams = useSearchParams()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedButton, setSelectedButton] = useState('')
  const teacherData = useSelector(userData).currentTeacher?.data!
  const classID = Number(searchParams.get('id'))
  const {
    data: assignedModule,
    mutate: mutateAssignedModule,
    isLoading,
    error,
  } = useGetAssignedModule({
    school_id: teacherData?.school.id,
    teacher_id: `${teacherData?.teacher_id}`,
    type: 'classwork',
  })
  const {
    data: classworkData,
    mutate,
    isLoading: isLoadingClasswork,
    error: errorClasswork,
  } = useGetClasswork(teacherData?.teacher_id, teacherData?.school?.id, classID)
  if (isLoading || isLoadingClasswork) return <Loader />
  if (errorClasswork || error) return <p className="text-error">Server Error</p>

  const handleToggle = (selectedButton: string) => {
    setModalOpen(true)
    setSelectedButton(selectedButton)
  }

  const handleFormSubmit = async (formValues: any, reset: () => void) => {
    if (formValues.attachment[0].size > 1000000) {
      toast.error('File is too large', {
        position: toast.POSITION.TOP_RIGHT,
      })
      return
    }
    let formData: any = new FormData()
    formData.append('media_url', formValues.attachment[0])
    formData.append('teacher_id', teacherData?.teacher_id)
    formData.append('class_id', classID)
    formData.append('school_id', teacherData?.school?.id)
    formData.append('name', formValues.name)
    await addClasswork(formData)
    setModalOpen(false)
    reset()
    mutate()
  }

  const handleModuleSubmit = async (formValues: any, reset: (value: any) => void) => {
    let formdata: IModuleAssignmentPayload = {
      school_id: teacherData.school.id,
      teacher_id: teacherData.teacher_id,
      class_id: classID,
      type: 'classwork',
      data: [
        {
          ...formValues,
          no_attempt: Number(formValues.no_attempt),
          mark: Number(formValues.mark),
          time: Math.ceil(Number(formValues.time.split(':')[0])),
          notification: true,
        },
      ],
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
          <div className="flex items-center justify-between mb-6">
            <p className={styles.cardTitle}>CLASSWORK</p>
            <Button
              handleClick={() => {
                handleToggle('assign-classwork')
              }}
              text="Assign File"
            />
          </div>
          <div className="mb-20 flex items-center gap-8 flex-wrap justify-start">
            {classworkData?.length ? (
              classworkData?.map((item: any) => (
                <ClassworkCard
                  data={item}
                  key={item.id}
                  handleDeleteClasswork={handleDeleteClasswork}
                />
              ))
            ) : classworkData?.length === 0 ? (
              <span className="text-sm">No Classwork</span>
            ) : null}
          </div>
        </div>
        <div className={styles.cardWrap}>
          <div className="flex items-center justify-between mb-6">
            <p className={styles.cardTitle}>MODULE CLASSWORK</p>
            <Button
              handleClick={() => {
                handleToggle('assign-module')
              }}
              text="Assign Module"
            />
          </div>
          <div className="mb-20 flex items-center gap-8 flex-wrap justify-start">
            {assignedModule?.length ? (
              assignedModule?.map((module: any) => (
                <AssignModuleCard
                  module={module}
                  key={module.id}
                  handleModuleDelete={handleModuleDelete}
                />
              ))
            ) : assignedModule?.length === 0 ? (
              <span className="text-sm">No Module</span>
            ) : null}
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
