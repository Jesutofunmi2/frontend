'use client'

import React from 'react'
import styles from './page.module.css'
import { TextInputValue } from '@/components/Form/FormFields/TextInput/TextInput'
import Image from 'next/image'
import userIcon from '/public/assets/images/userIcon.png'
import { useSelector } from 'react-redux'
import { userData } from '@/services/redux/features/userSlice'
import { toast } from 'react-toastify'

const TeacherProfile = () => {
  const teacherData = useSelector(userData).currentTeacher?.data!
  const countDown = useSelector(userData).currentUser?.data.count_down
  if (countDown) {
    toast.warning(<p className="text-lg">{countDown}</p>, {
      position: toast.POSITION.TOP_RIGHT,
      toastId: 'countdown_teacher',
      theme: 'colored',
      autoClose: false,
    })
  }
  return (
    <>
      <div className={styles.container}>
        <h3 className="bg-white p-4 rounded-xl text-lg font-bold">Profile</h3>
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

          <div className="bg-white px-4 py-8 md:p-8 mt-12 rounded-lg grid grid-cols-1 gap-8 md:grid-cols-2">
            <TextInputValue name="name" label="Name" defaultValue={teacherData?.name} />
            <TextInputValue name="email" label="Email" defaultValue={teacherData?.email} />
          </div>
          <hr />
          <div className={styles.btnWrap}></div>
        </div>
      </div>
    </>
  )
}

export default TeacherProfile
