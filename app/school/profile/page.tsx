'use client'

import React from 'react'
import styles from './page.module.css'
import TextInput from '@/components/Form/FormFields/TextInput/TextInput'
import { useSelector } from 'react-redux'
import { userData } from '@/services/redux/features/userSlice'

const SchoolProfile = () => {
  const schoolProfileData = useSelector(userData).currentSchool?.data!

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {}

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>{schoolProfileData?.school_name}</h3>
        <div>
          <div className={styles.details}>
            <TextInput
              title="Name"
              defaultValue={schoolProfileData?.school_name}
              handleChange={handleChange}
              readOnly={true}
            />
            <TextInput
              title="Country"
              defaultValue={schoolProfileData?.country}
              handleChange={handleChange}
              readOnly={true}
            />
            <TextInput
              title="Email"
              defaultValue={schoolProfileData?.email}
              handleChange={handleChange}
              readOnly={true}
            />
            <TextInput
              title="Phone Number"
              defaultValue={schoolProfileData?.phone_number}
              handleChange={handleChange}
              readOnly={true}
            />
          </div>
          <hr />
          <div className={styles.btnWrap}></div>
        </div>
      </div>
    </>
  )
}

export default SchoolProfile
