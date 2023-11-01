'use client'

import React, { useState } from 'react'
import styles from './page.module.css'
import ClassCard from '@/components/Card/ClassCard/ClassCard'
import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'
import AddEditClass from '@/components/Form/Forms/AddEditClass/AddEditClass'
import { useSelector } from 'react-redux'
import { Loader } from '@/components/Loader/Loader'
import { userData } from '@/services/redux/features/userSlice'
import { useGetTeacherClasses } from '@/services/api/teacher/class'
import { addClass, deleteClass, useGetClasses } from '@/services/api/school/class'

const TeacherClass = () => {
  const [classDetails, setclassDetails] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const teacherData = useSelector(userData).currentTeacher?.data!
  // const teacherID = useSelector(userData).currentTeacher?.data.teacher_id!

  // const { data: teacherData, isLoading, error, mutate } = useGetTeacherClasses(teacherID)
  const { data: allSchoolClasses, isLoading, error, mutate } = useGetClasses(teacherData.school.id)
  if (!allSchoolClasses) return null
  if (isLoading) return <Loader />
  if (error) return <p>error page</p>

  // OPEN MODAL CONDITION
  const handleModalOpen = (modalEvent: string, data: any) => {
    switch (modalEvent) {
      case 'add':
        setModalOpen(true)
        setclassDetails(null)
        break
      case 'edit':
        setModalOpen(true)
        setclassDetails(data)
        break
      default:
        break
    }
  }

  const handleDeleteClass = async (class_id: number) => {
    let res = await deleteClass(teacherData.school.id, class_id)
    if (res) {
      mutate()
    }
  }
  return (
    <>
      <div className={styles.dash}>
        <h3 className="headerTitle">Classes</h3>
        <div className={styles.btnWrap}>
          <Button text="Add Class" width="190px" handleClick={() => handleModalOpen('add', '')} />
        </div>

        <div className={styles.classWrap}>
          {allSchoolClasses.length ? (
            allSchoolClasses.map((classroom: any) => (
              <ClassCard
                key={classroom.id}
                classroom={classroom}
                url={`/teacher/class/classroom`}
                handleDeleteClass={handleDeleteClass}
              />
            ))
          ) : (
            <p>No Classwork</p>
          )}
        </div>
      </div>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <AddEditClass
          title={classDetails ? 'Edit Class' : 'Add Class'}
          setModalOpen={setModalOpen}
          classDetails={classDetails}
          mutate={mutate}
          schoolID={teacherData.school.id}
        />
      </Modal>
    </>
  )
}

export default TeacherClass
