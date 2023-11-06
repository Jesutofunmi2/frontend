'use client'

import React, { useEffect } from 'react'
import styles from './page.module.css'
import SelectImage from '@/components/SelectImage/SelectImage'
import { TextInputValue } from '@/components/Form/FormFields/TextInput/TextInput'
import Image from 'next/image'
import userIcon from '/public/assets/images/userIcon.png'
import { useSelector } from 'react-redux'
import { userData } from '@/services/redux/features/userSlice'
import {BaselineFormTeacher } from '@/components/Form/Forms/BaselineForm/BaselineForm'

const TeacherProfile = () => {
  const teacherData = useSelector(userData).currentTeacher?.data!

if(!teacherData.survey_status){
return <BaselineFormTeacher/>
  }
    return (
    <>
      <div className={styles.container}>
        <h3 className='bg-white p-4 rounded-xl font-bold'>Profile</h3>
        <div>
          <div className={styles.imageWrap}>
          <Image
              src={userIcon}
              width="100"
              height="100"
              alt="image"
              className={styles.userIcon}
            />
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
