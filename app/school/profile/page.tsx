'use client'

import React from 'react'
import styles from './page.module.css'
import TextInput from '@/components/Form/FormFields/TextInput/TextInput'
import { useSelector } from 'react-redux'
import { userData } from '@/services/redux/features/userSlice'

const SchoolProfile = () => {
  const schoolProfileData = useSelector(userData).currentSchool?.data!


  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>{schoolProfileData?.school_name}</h3>
        <div>
          <div className={styles.details}>
            <TextInput
              // title="Name"
              defaultValue={schoolProfileData?.school_name}
              label="Name"
              placeholder="Enter name"
              readOnly
            />
            <TextInput label="Country" defaultValue={schoolProfileData?.country} readOnly />
            <TextInput label="Email" defaultValue={schoolProfileData?.email} readOnly />
            <TextInput
              label="Phone Number"
              defaultValue={schoolProfileData?.phone_number}
              readOnly
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
