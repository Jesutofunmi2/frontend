import React, { useState } from 'react'
import styles from './assigmentView.module.css'
import Button from '../../Button/Button'
import Modal from '../../Modal/Modal'
import { useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { userData } from '@/services/redux/features/userSlice'
import AssignModuleCard from '../../Card/AssignModuleCard/AssignModuleCard'
import AssignmentCard from '@/components/Card/AssignmentCard/AssignmentCard'
import AddFileForm from '@/components/Form/Forms/Assignment/AddFileForm/AddFileForm'
import AddVideoForm from '@/components/Form/Forms/Assignment/AddVideoForm/AddVideoForm'
import AddQuizForm from '@/components/Form/Forms/Assignment/AddQuizForm/AddQuizForm'
import { addAssignModule, deleteModule, useGetAssignedModule } from '@/services/api/module'
import AssignModuleView from '../AssignModuleView/AssignModuleView'
import { Loader } from '@/components/Loader/Loader'
import AssignQuizCard from '@/components/Card/AssignQuizCard/AssignQuizCard'
import AssignVideoCard from '@/components/Card/AssignVideoCard/AssignVideoCard'
import {
  addFileAssignment,
  addQuizAssignment,
  addVideoAssignment,
  deleteFileAssignment,
  deleteQuizAssignment,
  deleteVideoAssignment,
  useGetFileAssignments,
  useGetQuizAssignments,
  useGetVideoAssignments,
} from '@/services/api/assignment'
import {
  IFileAssignment,
  IModuleAssignment,
  IModuleAssignmentPayload,
  IQuizAssignment,
  IQuizAssignmentPayload,
  IVideoAssignment,
  IVideoAssignmentPayload,
} from '@/types/assignment'

const AssignmentView = () => {
  const searchParams = useSearchParams()
  const classID: Number = Number(searchParams.get('id'))
  const teacherData = useSelector(userData).currentTeacher?.data!
  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState('')
  const {
    data: fileAssignments,
    isLoading: isLoadingFile,
    error: errorFile,
    mutate,
  } = useGetFileAssignments(teacherData.school.id, classID, teacherData.teacher_id)

  const {
    data: moduleAssignments,
    mutate: mutateAssignedModule,
    isLoading: isLoadingModule,
    error: errorModule,
  } = useGetAssignedModule({
    school_id: teacherData?.school.id,
    teacher_id: `${teacherData?.teacher_id}`,
    type: 'assignment',
  })

  const {
    data: quizAssignments,
    mutate: mutateQuizAssignments,
    isLoading: isLoadingQuiz,
    error: errorQuiz,
  } = useGetQuizAssignments(teacherData.school.id, classID, teacherData.teacher_id)
  const {
    data: videoAssignments,
    mutate: mutateVideoAssignments,
    isLoading: isLoadingVideo,
    error: errorVideo,
  } = useGetVideoAssignments(teacherData.school.id, classID, teacherData.teacher_id)
  if (isLoadingFile || isLoadingModule || isLoadingQuiz || isLoadingVideo) return <Loader />
  if (errorVideo || errorQuiz || errorModule || errorFile)
    return <p className="text-error">Server Error</p>

  //File
  const handleAddFileAssignment = async (formValues: any, reset: () => void) => {
    setOpenModal(false)
    let formdata = new FormData()
    formdata.append('school_id', teacherData?.school?.id)
    formdata.append('teacher_id', teacherData?.teacher_id)
    formdata.append('class_id', String(classID))
    formdata.append('date', formValues.date)
    formdata.append('name', formValues.topic)
    formdata.append('mark', formValues.mark)
    formdata.append('notification', '0')
    formdata.append('media_url', formValues.attachment[0])
    await addFileAssignment(formdata)
    mutate()
    reset()
  }

  const handleFileAssignmentDelete = async (id: number) => {
    await deleteFileAssignment(teacherData?.school?.id, teacherData?.teacher_id, id)
    mutate()
  }

  // Module
  const handleModuleAssignment = async (formValues: any, reset: (value: any) => void) => {
    setOpenModal(false)
    let payload: IModuleAssignmentPayload = {
      school_id: teacherData.school.id,
      teacher_id: teacherData.teacher_id,
      class_id: Number(classID),
      type: 'assignment',
      data: [
        {
          ...formValues,
          time: Math.ceil(Number(formValues.time.split(':')[0])),
          notification: true,
        },
      ],
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

  // Quiz
  const handleQuizAssignment = async (formValues: any, reset: (inputValues: any) => void) => {
    setOpenModal(false)
    let payload: IQuizAssignmentPayload = {
      school_id: teacherData.school.id,
      teacher_id: teacherData.teacher_id,
      class_id: classID,
      notification: true,
      ...formValues,
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

  // Video
  const handleVideoAssignment = async (formValues: any, reset: (inputValues: any) => void) => {
    setOpenModal(false)
    let payload: IVideoAssignmentPayload = {
      school_id: teacherData.school.id,
      teacher_id: teacherData.teacher_id,
      class_id: classID,
      notification: true,
      ...formValues,
    }
    await addVideoAssignment(payload)
    reset({
      videos_id: [],
      module_id: '',
      deadline: new Date(),
      no_attempt: '',
      language_id: '',
      time: '',
      mark: '',
    })
    mutateVideoAssignments()
  }

  const handleVideoDelete = async (id: number) => {
    await deleteVideoAssignment(teacherData?.school?.id, classID, teacherData?.teacher_id, id)
    mutateVideoAssignments()
  }

  const handleModalOpen = (selected: string) => {
    setSelected(selected)
    setOpenModal(true)
  }

  return (
    <>
      <div className="mx-[20px] my-[70px]">
        <div className={styles.cardWrap}>
          <div className="flex items-center justify-between mb-6">
            {' '}
            <p className={styles.cardTitle}>FILE ASSIGNMENTS</p>
            <Button text="Assign File" handleClick={() => handleModalOpen('add-file')} />
          </div>
          <div className="mb-20 flex items-center gap-8 flex-wrap justify-start">
            {fileAssignments?.length ? (
              fileAssignments?.map((ele: IFileAssignment) => (
                <AssignmentCard
                  ele={ele}
                  key={ele.id}
                  handleFileAssignmentDelete={handleFileAssignmentDelete}
                />
              ))
            ) : fileAssignments?.length === 0 ? (
              <p className="text-sm">No File Assignment</p>
            ) : null}
          </div>
        </div>

        <div className={styles.cardWrap}>
          <div className="flex items-center justify-between mb-6">
            {' '}
            <p className={styles.cardTitle}>MODULE ASSIGNMENTS</p>
            <Button text="Assign Module" handleClick={() => handleModalOpen('add-module')} />
          </div>
          <div className="mb-20 flex items-center gap-8 flex-wrap justify-start">
            {moduleAssignments?.length ? (
              moduleAssignments?.map((module: IModuleAssignment) => (
                <AssignModuleCard
                  module={module}
                  key={module.id}
                  handleModuleDelete={handleModuleDelete}
                />
              ))
            ) : moduleAssignments?.length === 0 ? (
              <p className="text-sm">No Module Assignment</p>
            ) : null}
          </div>
        </div>

        <div className={styles.cardWrap}>
          <div className="flex items-center justify-between mb-6">
            {' '}
            <p className={styles.cardTitle}>QUIZ ASSIGNMENTS</p>
            <Button text="Assign Quiz" handleClick={() => handleModalOpen('add-quiz')} />
          </div>
          <div className="mb-20 flex items-center gap-8 flex-wrap justify-start">
            {quizAssignments?.length ? (
              quizAssignments?.map((quiz: IQuizAssignment) => (
                <AssignQuizCard quiz={quiz} key={quiz.id} handleQuizDelete={handleQuizDelete} />
              ))
            ) : quizAssignments?.length === 0 ? (
              <p className="text-sm">No Quiz Assignment</p>
            ) : null}
          </div>
        </div>

        <div className={styles.cardWrap}>
          <div className="flex items-center justify-between mb-6">
            {' '}
            <p className={styles.cardTitle}>VIDEO ASSIGNMENTS</p>
            <Button text="Assign Video" handleClick={() => handleModalOpen('add-video')} />
          </div>
          <div className="mb-20 flex items-center gap-8 flex-wrap justify-start">
            {videoAssignments?.length ? (
              videoAssignments?.map((video: IVideoAssignment) => (
                <AssignVideoCard
                  video={video}
                  key={video.id}
                  handleVideoDelete={handleVideoDelete}
                />
              ))
            ) : videoAssignments?.length === 0 ? (
              <p className="text-sm">No Video Assignment</p>
            ) : null}
          </div>
        </div>
      </div>

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
