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
import { deleteModule, useGetAssignedModule } from '@/services/api/module'

import { useSelector } from 'react-redux'
import { addAssignmentFile } from '@/services/api/post'
import { userData } from '@/services/redux/features/userSlice'
import { useGetClasses } from '@/services/api/school/class'
import { Loader } from '@/components/Loader/Loader'
import { useGetStudents } from '@/services/api/school/student'

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
  const { data: allSchoolClasses, isLoading, error } = useGetClasses(teacherData.school.id)
  const { data: allStudents } = useGetStudents(teacherData.school.id)

  if (!allSchoolClasses) return null
  if (isLoading) return <Loader />
  if (error) return <p>error page</p>

  const classRoomData = allSchoolClasses.find((classroom) => classroom.id === classroomID)
  const handleActiveTab = (activeTab: 'Students' | 'Classwork' | 'Assignment' | 'Gradebook') =>
    setActiveTab(activeTab)

  const tableHead = ['NAME', 'LANGUAGE', 'GENDER', '']

  const getClassroomStudent = allStudents?.filter(
    (ele) => classRoomData?.classs_room_name === ele.class
  )
  console.log(classRoomData)
  const tableBody = () => {
    return (
      <>
        {getClassroomStudent?.map((ele) => {
          return (
            <tr key={ele.id}>
              <td>{ele?.username}</td>
              <td>{ele?.language}</td>
              <td>{ele?.gendar}</td>
              <td>
                <div className="action">
                  <AiFillEdit className="editIcon" />
                  <RiDeleteBin6Line className="deleteIcon" />
                </div>
              </td>
            </tr>
          )
        })}
      </>
    )
  }
  {
    /* <td>
          <div className="action">
            <AiFillEdit className="editIcon" />
            <RiDeleteBin6Line className="deleteIcon" />
          </div>
        </td> */
  }
  return (
    <>
      <div>
        <BackNavigation />
        <h3 className="p-4 mt-3 text-xl rounded-lg bg-white">{classRoomData?.classs_room_name}</h3>
        <div className={styles.tabWrap}>
          <Tab1 tabData={tabData} handleActiveTab={handleActiveTab} activeTab={activeTab} />
        </div>

        <div className={styles.views}>
          <div className={styles.sectionWrap}>
            {activeTab === 'Students' ? (
              <Table head={tableHead} body={tableBody} />
            ) : activeTab === 'Classwork' ? (
              <ClassworkView />
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

// ASSIGNMENT VIEW WRAPPER
const AssignmentViewWrapper = () => {
  const searchParams = useSearchParams()
  const classID: any = Number(searchParams.get('id'))
  const teacherData = useSelector(userData).currentTeacher?.data!
  const [openModal, setOpenModal] = useState(false)

  // Get assigned module API request hook
  const { data: assignedModule, mutate } = useGetAssignedModule({
    school_id: `${teacherData?.school?.id}`,
    teacher_id: `${teacherData?.teacher_id}`,
  })

  // Delete module function
  // const handleModuleDelete = (id) => {
  //   deleteModule({
  //     schoolID: teacherData?.school?.id,
  //     teacherID: teacherData?.teacher_id,
  //     id: id,
  //   })
  // }

  // Add module assignment
  const handleAddFile = async (payload: any, reset: () => void) => {
    let formdata = new FormData()
    formdata.append('school_id', teacherData?.school?.id)
    formdata.append('teacher_id', teacherData?.teacher_id)
    formdata.append('class_id', classID)
    formdata.append('date', payload.date)
    formdata.append('name', payload.topic)
    formdata.append('mark', payload.mark)
    formdata.append('notification', '0')
    formdata.append('media_url', payload.attachment[0])
    let res = await addAssignmentFile(formdata)
    if (res) {
      mutate()
      setOpenModal(false)
      reset()
    }
  }

  return (
    <>
      <AssignmentView
        handleAddFile={handleAddFile}
        setOpenModal={setOpenModal}
        openModal={openModal}
      />
    </>
  )
}
