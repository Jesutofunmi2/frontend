'use client'

import React from 'react'
import styles from './page.module.css'
import ClassCard from '@/components/Card/ClassCard/ClassCard'
import { useSelector } from 'react-redux'
import { Loader } from '@/components/Loader/Loader'
import { userData } from '@/services/redux/features/userSlice'
import { useGetTeacherClasses } from '@/services/api/teacher/class'

const TeacherClass = () => {
  const teacherData = useSelector(userData).currentTeacher?.data!

  const {
    data: allTeacherClasses,
    isLoading,
    error,
  } = useGetTeacherClasses(teacherData.school.id, teacherData.teacher_id)
  if (!allTeacherClasses) return null
  if (isLoading) return <Loader />
  if (error) return <p>error page</p>

  return (
    <>
      <div className={styles.dash}>
        <h3 className="bg-white p-4 rounded-xl">
          {allTeacherClasses?.length > 1 ? 'Classes' : 'Class'}
        </h3>

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
    </>
  )
}

export default TeacherClass
