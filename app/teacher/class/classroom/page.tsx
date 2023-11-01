'use client'

import React, { useState } from 'react'
import styles from './page.module.css'
import Tab1 from '@/components/Tab/Tab1/Tab1'
import { BsPeople } from 'react-icons/bs'
import { TfiBlackboard } from 'react-icons/tfi'
import { MdPersonAddAlt } from 'react-icons/md'
import Table from '@/components/Table/Table'
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import BackNavigation from '@/components/BackNavigation/BackNavigation'
import { useSearchParams } from 'next/navigation'
import ClassworkView from '@/components/Views/ClassworkView/ClassworkView'
import AssignmentView from '@/components/Views/AssigmentView/AssigmentView'
import GradebookView from '@/components/Views/GradebookView/GradebookView'
import { PiBookOpenBold } from 'react-icons/pi'
import { LuSettings } from 'react-icons/lu'
import { useGetAssignedModule } from '@/services/api/module'
import { deleteClasswork, useGetClasswork } from '@/services/api/classwork'
import { useSelector } from 'react-redux'
import { usePost } from '@/services/api/post'
import { userData } from '@/services/redux/features/userSlice'
import { useGetClasses } from '@/services/api/school/class'
import { Loader } from '@/components/Loader/Loader'

const tabData = [
  { text: 'Students', icon: <BsPeople /> },
  { text: 'Classwork', icon: <TfiBlackboard /> },
  { text: 'Assignment', icon: <MdPersonAddAlt /> },
  { text: 'Gradebook', icon: <PiBookOpenBold /> },
  { text: 'Settings', icon: <LuSettings /> },
]

const ClassRoom = () => {
  const searchParams = useSearchParams()
  const classroomID = Number(searchParams.get('id'))
  const [activeTab, setActiveTab] = useState<'Students' | 'Classwork' | 'Assignment' | 'Gradebook'>(
    'Students'
  )
  const teacherData = useSelector(userData).currentTeacher?.data!
  const { data: allSchoolClasses, isLoading, error, mutate } = useGetClasses(teacherData.school.id)
  if (!allSchoolClasses) return null
  if (isLoading) return <Loader />
  if (error) return <p>error page</p>

  const classRoomData = allSchoolClasses.find((classroom) => classroom.id === classroomID)
  const handleActiveTab = (activeTab: 'Students' | 'Classwork' | 'Assignment' | 'Gradebook') =>
    setActiveTab(activeTab)
  // TABLE HEAD
  const tableHead = ['NAME', 'LANGUAGE', 'GENDER', '']

  // TABLE BODY
  const tableBody = () => {
    return (
      <tr>
        <td>James</td>
        <td>Idoma</td>
        <td>Male</td>
        <td>
          <div className="action">
            <AiFillEdit className="editIcon" />
            <RiDeleteBin6Line className="deleteIcon" />
          </div>
        </td>
      </tr>
    )
  }

  return (
    <>
      <div>
        <BackNavigation />
        <h3 className="headerTitle">{classRoomData?.language}</h3>
        <div className={styles.tabWrap}>
          <Tab1 tabData={tabData} handleActiveTab={handleActiveTab} activeTab={activeTab} />
        </div>

        <div className={styles.views}>
          <h3>{activeTab}</h3>

          <div className={styles.sectionWrap}>
            {activeTab === 'Students' ? (
              <Table head={tableHead} body={tableBody} />
            ) : activeTab === 'Classwork' ? (
              <ClassworkViewWrapper />
            ) : activeTab === 'Assignment' ? (
              <AssignmentViewWrapper />
            ) : activeTab === 'Gradebook' ? (
              <GradebookView />
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default ClassRoom

// CLASSWORK VIEW WRAPPER
export const ClassworkViewWrapper = () => {
  const searchParams = useSearchParams()
  const classID = Number(searchParams.get('id'))
  const teacherData = useSelector(userData).currentTeacher?.data!

  const { data: classworkData, mutate } = useGetClasswork(
    teacherData?.teacher_id,
    teacherData?.school?.id,
    classID
  )

  // Delete classwork API request hook
  // const { sendRequest } = deleteClasswork(mutate)

  // Delete module API request hook
  // const { deleteModule } = deleteModule(mutate)

  // Delete assigned module API request hook
  // const { trigger } = deleteModule({
  //   school_id: `${teacherData?.school?.id}`,
  //   teacher_id: `${teacherData?.teacher_id}`,
  // })

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
      <ClassworkView
        classworkData={classworkData}
        handleDeleteClasswork={handleDeleteClasswork}
        teacher_id={teacherData?.teacher_id}
        school_id={teacherData?.school?.id}
      />
    </>
  )
}

// ASSIGNMENT VIEW WRAPPER
export const AssignmentViewWrapper = () => {
  const searchParams = useSearchParams()
  const classID = searchParams.get('id')
  const teacherData = useSelector((state) => state?.user?.currentTeacher?.data)
  const [modal, setModal] = useState(false)

  // Delete module API request hook
  const { deleteModule } = useDeleteModule()

  // Delete module API request hook
  const { trigger: addFile } = usePost('/api/v1/teacher/assignment/file')

  // Get assigned module API request hook
  const { data: assignedModule } = useGetAssignedModule({
    school_id: `${teacherData?.school?.id}`,
    teacher_id: `${teacherData?.teacher_id}`,
  })

  // Delete assigned module API request hook
  const { trigger } = useDeleteModule({
    school_id: `${teacherData?.school?.id}`,
    teacher_id: `${teacherData?.teacher_id}`,
  })

  // Delete module function
  const handleModuleDelete = (id) => {
    deleteModule({
      schoolID: teacherData?.school?.id,
      teacherID: teacherData?.teacher_id,
      id: id,
    })
  }

  // Add module assignment
  const handleAddFile = (formdata) => {
    // console.log(formdata)
    addFile({
      school_id: `${teacherData?.school?.id}`,
      teacher_id: `${teacherData?.teacher_id}`,
      class_id: classID,
      date: formdata?.date,
      name: formdata?.topic,
      mark: formdata?.mark,
      notification: 0,
      media_url: formdata.file,
    })
    setModal(false)
  }

  return (
    <>
      <AssignmentView handleAddFile={handleAddFile} modal={modal} setModal={setModal} />
    </>
  )
}
