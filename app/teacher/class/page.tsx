'use client'

import React, { useState } from 'react'
import styles from './page.module.css'
import ClassCard from '@/components/Card/ClassCard/ClassCard'
import Modal from '@/components/Modal/Modal'
import AddEditClass from '@/components/Form/Forms/AddEditClass/AddEditClass'
import { useSelector } from 'react-redux'
import { Loader } from '@/components/Loader/Loader'
import { userData } from '@/services/redux/features/userSlice'
import { useGetTeacherClasses } from '@/services/api/teacher/class'

const TeacherClass = () => {
  const [classDetails, setclassDetails] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const teacherData = useSelector(userData).currentTeacher?.data!

  const {
    data: allTeacherClasses,
    isLoading,
    error,
    mutate,
  } = useGetTeacherClasses(teacherData.school.id, teacherData.teacher_id)
  if (!allTeacherClasses) return null
  if (isLoading) return <Loader />
  if (error) return <p>error page</p>

  return (
    <>
      <div className={styles.dash}>
        <h3 className="bg-white p-4 rounded-xl">Classes</h3>

        <div className={styles.classWrap}>
          {allTeacherClasses?.length ? (
            allTeacherClasses.map((classroom: any) => (
              <ClassCard
                key={classroom.id}
                classroom={classroom}
                url={`/teacher/class/classroom`}
              />
            ))
          ) : (
            <tr>No Class</tr>
          )}
        </div>
      </div>
      {/* <Modal open={modalOpen} setOpen={setModalOpen}>
        <AddEditClass
          title={classDetails ? 'Edit Class' : 'Add Class'}
          setModalOpen={setModalOpen}
          classDetails={classDetails}
          mutate={mutate}
          schoolID={teacherData.school.id}
          teacherID={teacherData.teacher_id}
        />
      </Modal> */}
    </>
  )
}

export default TeacherClass
