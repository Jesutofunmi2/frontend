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
import { userData } from '@/services/redux/features/userSlice'
import { useGetClasses, useGetTeacherClassStudent } from '@/services/api/school/class'
import { Loader } from '@/components/Loader/Loader'
import { useGetTeacherClasses } from '@/services/api/teacher/class'

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
  const {
    data: allTeacherClasses,
    isLoading,
    error,
    mutate,
  } = useGetTeacherClasses(teacherData.school.id, teacherData.teacher_id)
  const { data: teacherClassStudents } = useGetTeacherClassStudent(
    classroomID,
    teacherData.teacher_id
  )

  if (!allTeacherClasses) return null
  if (isLoading) return <Loader />
  if (error) return <p>error page</p>

  const classRoomData = allTeacherClasses.find((classroom: any) => classroom.id === classroomID)
  const handleActiveTab = (activeTab: 'Students' | 'Classwork' | 'Assignment' | 'Gradebook') =>
    setActiveTab(activeTab)

  const tableHead = ['NAME', 'LANGUAGE', 'GENDER', '']

  const tableBody = () => {
    return teacherClassStudents?.length ? (
      <>
        {teacherClassStudents?.map((ele: any) => {
          return (
            <tr key={ele.id}>
              <td>{ele?.first_name}</td>
              <td>{ele?.language}</td>
              <td>{ele?.gender}</td>
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
    ) : (
      <tr className="w-full p-4">
        <td>No Student</td>
      </tr>
    )
  }
  {
    ; <td>
      <div className="action">
        <AiFillEdit className="editIcon" />
        <RiDeleteBin6Line className="deleteIcon" />
      </div>
    </td>
  }
  return (
    <>
      <div>
        <BackNavigation />
        <h3 className="p-4 mt-3 text-xl rounded-lg bg-white">
          {classRoomData?.class[0]?.name} {classRoomData?.class_arm[0]?.name}
        </h3>
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
              <AssignmentView />
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
