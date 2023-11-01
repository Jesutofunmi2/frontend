'use client'

import React from 'react'
import styles from './page.module.css'
import SelectImage from '@/components/SelectImage/SelectImage'
import { TextInputValue } from '@/components/Form/FormFields/TextInput/TextInput'

import { useSelector } from 'react-redux'
import { userData } from '@/services/redux/features/userSlice'

const TeacherProfile = () => {
  const teacherData = useSelector(userData).currentTeacher?.data!
  console.log(teacherData)


  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>Profile</h3>
        <div>
          <div className={styles.imageWrap}>
            <SelectImage />
          </div>

          <div className={styles.details}>
            <TextInputValue name="name" label="Name" defaultValue={teacherData?.name} />
            <TextInputValue name="email" label="Email" defaultValue={teacherData?.email} />
          </div>
          <hr />
          <div className={styles.btnWrap}>
            {/* <Button text="Edit" maxWidth="200px" width="100%"/> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default TeacherProfile
