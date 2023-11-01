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
import { usePathname, useSearchParams } from 'next/navigation'
import ClassworkView from '@/components/Views/ClassworkView/ClassworkView'
import AssignmentView from '@/components/Views/AssigmentView/AssigmentView'
import GradebookView from '@/components/Views/GradebookView/GradebookView'
import { PiBookOpenBold } from 'react-icons/pi'
import { LuSettings } from 'react-icons/lu'
import { deleteModule, useGetAssignedModule } from '@/services/api/module'
import { deleteClasswork, useGetClasswork } from '@/services/api/classwork'
import { useSelector } from 'react-redux'
import { usePost } from '@/services/api/post'
import { userData } from '@/services/redux/features/userSlice'

const tabData = [
  { text: 'Students', icon: <BsPeople /> },
  { text: 'Classwork', icon: <TfiBlackboard /> },
  { text: 'Assignment', icon: <MdPersonAddAlt /> },
  { text: 'Gradebook', icon: <PiBookOpenBold /> },
  { text: 'Settings', icon: <LuSettings /> },
]

const ClassRoom = () => {
  const [activeTab, setActiveTab] = useState<'Students' | 'Classwork' | 'Assignment' | 'Gradebook'>(
    'Students'
  )

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
        <h3 className="headerTitle">Yoruba Language</h3>
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
  // const teacherData = useSelector((state) => state?.user?.currentTeacher?.data)
  const teacherData = useSelector(userData).currentTeacher?.data!
  // Get classwork API request hook
  const { data: classwork, mutate } = useGetClasswork(
    teacherData?.teacher_id,
    teacherData?.school?.id,
    classID
  )



  // Delete classwork API request hook
  // const { sendRequest } = deleteClasswork(mutate)

  // Delete module API request hook
  // const { deleteModule } = deleteModule(mutate)

  // Get assigned module API request hook
  const { data: assignedModule } = useGetAssignedModule({
    school_id: `${teacherData?.school?.id}`,
    teacher_id: `${teacherData?.teacher_id}`,
  })

  // Delete assigned module API request hook
  // const { trigger } = deleteModule({
  //   school_id: `${teacherData?.school?.id}`,
  //   teacher_id: `${teacherData?.teacher_id}`,
  // })

  // Delete Class function
  const handleClassDelete = (param) => {
    sendRequest({
      name: param?.name,
      teacherID: teacherData?.teacher_id,
      schoolID: teacherData?.school?.id,
      classID: classID,
    })
  }

  // Delete module function
  const handleModuleDelete = (id) => {
    deleteModule({
      schoolID: teacherData?.school?.id,
      teacherID: teacherData?.teacher_id,
      id: id,
    })
  }
  return (
    <>
      <ClassworkView
        classworkData={classwork}
        assignedModule={assignedModule}
        handleClassDelete={handleClassDelete}
        handleModuleDelete={handleModuleDelete}
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
