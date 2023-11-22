import React, { useState } from 'react'
import styles from './assigmentView.module.css'
import Button from '../../Button/Button'
import Modal from '../../Modal/Modal'
import AssignModuleCard from '../../Card/AssignModuleCard/AssignModuleCard'
import AssignmentCard from '@/components/Card/AssignmentCard/AssignmentCard'
import AddFileForm from '@/components/Form/Forms/Assignment/AddFileForm/AddFileForm'
import {
  addFileAssignment,
  addQuizAssignment,
  deleteFileAssignment,
  deleteQuizAssignment,
  useGetFileAssignments,
  useGetQuizAssignments,
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
import AssignQuizCard from '@/components/Card/AssignQuizCard/AssignQuizCard'
import {
  IFileAssignment,
  IModuleAssignment,
  IModuleAssignmentPayload,
  IQuizAssignment,
  IQuizAssignmentPayload,
} from '@/types/assignment'

const AssignmentView = () => {
  const searchParams = useSearchParams()
  const classID: Number = Number(searchParams.get('id'))
  const teacherData = useSelector(userData).currentTeacher?.data!
  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState('')
  const {
    data: fileAssignments,
    isLoading,
    error,
    mutate,
  } = useGetFileAssignments(teacherData.school.id, classID, teacherData.teacher_id)
  const { data: quizAssignments, mutate: mutateQuizAssignments } = useGetQuizAssignments(
    teacherData.school.id,
    classID,
    teacherData.teacher_id
  )

  const { data: moduleAssignments, mutate: mutateAssignedModule } = useGetAssignedModule({
    school_id: teacherData?.school.id,
    teacher_id: `${teacherData?.teacher_id}`,
    type: 'assignment',
  })

  //File
  const handleAddFileAssignment = async (payload: any, reset: () => void) => {
    setOpenModal(false)
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
    reset()
  }

  const handleFileAssignmentDelete = async (id: number) => {
    await deleteFileAssignment(teacherData?.school?.id, teacherData?.teacher_id, id)
    mutate()
  }

  // Module
  const handleModuleAssignment = async (data: any, reset: (value: any) => void) => {
    setOpenModal(false)
    let payload: IModuleAssignmentPayload = {
      school_id: teacherData.school.id,
      teacher_id: teacherData.teacher_id,
      class_id: Number(classID),
      type: 'assignment',
      data: [{ ...data, time: Math.ceil(Number(data.time.split(':')[0])), notification: true }],
    }
    await addAssignModule(payload)
    mutateAssignedModule()
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

  // Video
  const handleVideoAssignment = async () => {}

  // Quiz
  const handleQuizAssignment = async (data: any, reset: (inputValues: any) => void) => {
    setOpenModal(false)
    let payload: IQuizAssignmentPayload = {
      school_id: teacherData.school.id,
      teacher_id: teacherData.teacher_id,
      class_id: classID,
      notification: true,
      ...data,
    }
    await addQuizAssignment(payload)
    reset({
      questions_id: [],
      module_id: '',
      deadline: new Date(),
      no_attempt: 0,
      language_id: 0,
      time: '',
      mark: 0,
    })
    mutateQuizAssignments()
  }

  const handleQuizDelete = async (id: number) => {
    await deleteQuizAssignment(teacherData?.school?.id, classID, teacherData?.teacher_id, id)
    mutateQuizAssignments()
  }

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
            <Button text="Assign File" handleClick={() => handleModalOpen('add-file')} />
            <p className={styles.cardTitle}>FILE ASSIGNMENTS</p>
          </div>

          {fileAssignments?.length ? (
            <div className={styles.cards}>
              {fileAssignments?.map((ele: IFileAssignment) => {
                return (
                  <AssignmentCard
                    ele={ele}
                    key={ele.id}
                    handleFileAssignmentDelete={handleFileAssignmentDelete}
                  />
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-center">No File Assignment</p>
          )}
        </div>

        <div className={styles.cardWrap}>
          <div className="flex items-center justify-start gap-48 mb-10">
            {' '}
            <Button text="Assign Module" handleClick={() => handleModalOpen('add-module')} />
            <p className={styles.cardTitle}>MODULE ASSIGNMENTS</p>
          </div>
          <div className={styles.cards}>
            {moduleAssignments?.length ? (
              moduleAssignments?.map((module: IModuleAssignment) => (
                <AssignModuleCard
                  module={module}
                  key={module.id}
                  handleModuleDelete={handleModuleDelete}
                />
              ))
            ) : moduleAssignments?.length === 0 ? (
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
            <Button text="Assign Quiz" handleClick={() => handleModalOpen('add-quiz')} />
            <p className={styles.cardTitle}>QUIZ ASSIGNMENTS</p>
          </div>
          <div className={styles.cards}>
            {quizAssignments?.length ? (
              quizAssignments?.map((quiz: IQuizAssignment) => (
                <AssignQuizCard quiz={quiz} key={quiz.id} handleQuizDelete={handleQuizDelete} />
              ))
            ) : quizAssignments?.length === 0 ? (
              <p className="text-sm text-center">No Quiz Assignment</p>
            ) : error ? (
              <NotFound text={'Server Error'} />
            ) : (
              <Loader />
            )}
          </div>
        </div>
        {/* AssignQuizCard  */}
        <div className={styles.cardWrap}>
          <div className="flex items-center justify-start gap-48 mb-10">
            {' '}
            <Button text="Assign Video" disabled handleClick={() => handleModalOpen('add-video')} />
            <p className={styles.cardTitle}>VIDEO ASSIGNMENTS</p>
          </div>
          <p className="text-sm text-center">No Video Assignment</p>
          {/* <LanguageVideoSelection /> */}
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
