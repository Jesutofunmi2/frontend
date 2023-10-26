'use client'

import React from 'react'
import styles from './page.module.css'
import TextInput from '@/components/Form/FormFields/TextInput/TextInput'
import { useSelector } from 'react-redux'
import { userData } from '@/services/redux/features/userSlice'


const SchoolProfile = () => { 
  const profileData = useSelector(userData)
  const schoolProfile= profileData.currentSchool?.data!

  console.log(profileData)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {}

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>{schoolProfile?.school_name}</h3>
        <div>
          <div className={styles.details}>
            <TextInput
              title="Name"
              defaultValue={schoolProfile?.school_name}
              handleChange={handleChange}
              readOnly={true}
            />
            <TextInput
              title="Country"
              defaultValue={schoolProfile?.country}
              handleChange={handleChange}
              readOnly={true}
            />
            <TextInput
              title="Email"
              defaultValue={schoolProfile?.email}
              handleChange={handleChange}
              readOnly={true}
            />
            <TextInput
              title="Phone Number"
              defaultValue={schoolProfile?.phone_number}
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
