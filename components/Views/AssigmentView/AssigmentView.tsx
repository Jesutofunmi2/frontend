import React, { useState } from 'react'
import styles from './assigmentView.module.css'
import Button from '../../Button/Button'
import Modal from '../../Modal/Modal'

import AssignVideoCard from '@/components/Card/AssignVideoCard/AssignVideoCard'
import AssignModuleCard from '../../Card/AssignModuleCard/AssignModuleCard'
import AssignmentCard from '@/components/Card/AssignmentCard/AssignmentCard'
// import AssignmentForm from '@/components/Form/Forms/AssignmentForm/AssignmentForm'
import AssignVideoForm from '@/components/Form/Forms/AssignVideoForm/AssignVideoForm'
import AddModuleForm from '../../Form/Forms/Assignment/AddModuleForm/AddModuleForm'
import AddFileForm from '@/components/Form/Forms/Assignment/AddFileForm/AddFileForm'
import {
  addFileAssignment,
  deleteFileAssignment,
  useGetFileAssignments,
} from '@/services/api/assignment'
import { useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { userData } from '@/services/redux/features/userSlice'
import AddVideoForm from '@/components/Form/Forms/Assignment/AddVideoForm/AddVideoForm'
import AddQuizForm from '@/components/Form/Forms/Assignment/AddQuizForm/AddQuizForm'
import { addAssignModule, deleteModule, useGetAssignedModule } from '@/services/api/module'
import AssignModuleView from '../AssignModuleView/AssignModuleView'
import NotFound from '@/components/NotFound/NotFound'
import { Loader } from '@/components/Loader/Loader'
import LanguageVideoSelection from '@/components/LanguageVideoSelection.tsx/LanguageVideoSelection'

const AssignmentView = () => {
  const searchParams = useSearchParams()
  const classID: any = Number(searchParams.get('id'))
  const teacherData = useSelector(userData).currentTeacher?.data!
  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState('')

  const {
    data: fileAssignments,
    isLoading,
    error,
    mutate,
  } = useGetFileAssignments(teacherData.school.id, classID, teacherData.teacher_id)

  const { data: assignedModule, mutate: mutateAssignedModule } = useGetAssignedModule({
    school_id: teacherData?.school.id,
    teacher_id: `${teacherData?.teacher_id}`,
  })

  const handleAddFileAssignment = async (payload: any, reset: () => void) => {
    let formdata = new FormData()
    formdata.append('school_id', teacherData?.school?.id)
    formdata.append('teacher_id', teacherData?.teacher_id)
    formdata.append('class_id', String(classID))
    formdata.append('date', payload.date)
    formdata.append('name', payload.topic)
    formdata.append('mark', payload.mark)
    formdata.append('notification', '0')
    formdata.append('media_url', payload.attachment[0])
    await addFileAssignment(formdata)
    mutate()
    setOpenModal(false)
    reset()
  }

  const handleFileAssignmentDelete = async (id: number) => {
    await deleteFileAssignment(teacherData?.school?.id, teacherData?.teacher_id, id)
    mutate()
  }

  const handleModuleAssignment = async (data: any, reset: (value: any) => void) => {
    let formdata = {
      school_id: teacherData.school.id,
      teacher_id: teacherData.teacher_id,
      class_id: classID,
      data: [{ ...data, time: Math.ceil(Number(data.time.split(':')[0])), notification: true }],
    }
    await addAssignModule(formdata)
    mutateAssignedModule()
    setOpenModal(false)
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
  const handleVideoAssignment = () => {}
  const handleQuizAssignment = () => {}
  const handleModalOpen = (selected: string) => {
    setSelected(selected)
    setOpenModal(true)
  }

  return (
    <>
      <div className="mt-20">
        <div className={styles.cardWrap}>
          <div className="flex items-center justify-start gap-48 mb-10">
            {' '}
            <Button text="Add File" handleClick={() => handleModalOpen('add-file')} />
            <p className={styles.cardTitle}>FILE ASSIGNMENTS</p>
          </div>

          {fileAssignments?.length ? (
            <div className={styles.cards}>
              {fileAssignments?.map(
                (ele: { deadline: string; id: number; name: string; media_url: string }) => {
                  return (
                    <AssignmentCard
                      ele={ele}
                      key={ele.id}
                      handleFileAssignmentDelete={handleFileAssignmentDelete}
                    />
                  )
                }
              )}
            </div>
          ) : (
            <p className="text-sm text-center">No File Assignment</p>
          )}
        </div>

        <div className={styles.cardWrap}>
          <div className="flex items-center justify-start gap-48 mb-10">
            {' '}
            <Button text="Add Module" handleClick={() => handleModalOpen('add-module')} />
            <p className={styles.cardTitle}>MODULE ASSIGNMENTS</p>
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
              <p className=" text-sm text-center">No Module Assignment</p>
            ) : error ? (
              <NotFound text={'Server Error'} />
            ) : (
              <Loader />
            )}
          </div>
        </div>

        <div className={styles.cardWrap}>
          <div className="flex items-center justify-start gap-48 mb-10">
            {' '}
            <Button text="Add Video" disabled handleClick={() => handleModalOpen('add-video')} />
            <p className={styles.cardTitle}>VIDEO ASSIGNMENTS</p>
          </div>

          <LanguageVideoSelection />
        </div>

        <div className={styles.cardWrap}>
          <div className="flex items-center justify-start gap-48 mb-10">
            {' '}
            <Button text="Add Quiz" disabled handleClick={() => handleModalOpen('add-quiz')} />
            <p className={styles.cardTitle}>QUIZ ASSIGNMENTS</p>
          </div>
          <div className={styles.cards}>{/* <AssignModuleCard /> */}</div>
          <p className="text-sm text-center">No Quiz Assignment</p>
        </div>
      </div>

      {/* MODALs */}
      <Modal open={openModal} setOpen={setOpenModal}>
        {selected === 'add-file' ? (
          <AddFileForm handleAddFileAssignment={handleAddFileAssignment} />
        ) : selected === 'add-module' ? (
          <AssignModuleView handleModuleSubmit={handleModuleAssignment} />
        ) : selected === 'add-video' ? (
          <AddVideoForm handleVideoAssignment={handleVideoAssignment} />
        ) : (
          <AddQuizForm handleQuizAssignment={handleQuizAssignment} />
        )}
      </Modal>
    </>
  )
}

export default AssignmentView
