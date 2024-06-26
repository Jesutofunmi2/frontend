'use client'

import React from 'react'
import styles from './page.module.css'
import { TextInputValue } from '@/components/Form/FormFields/TextInput/TextInput'
import { useSelector } from 'react-redux'
import { userData } from '@/services/redux/features/userSlice'
import { TitleCase } from '@/utils'

const SchoolProfile = () => {
  const schoolProfileData = useSelector(userData).currentSchool?.data!

  return (
    <>
      <div className={styles.container}>
        <h3 className="p-4 rounded-xl bg-white text-lg font-bold">
          {schoolProfileData?.school_name}
        </h3>
        <div>
          <div className="bg-white px-4 py-8 md:p-8 mt-12 rounded-lg grid grid-cols-1 gap-8 md:grid-cols-2">
            <TextInputValue
              name="school_name"
              defaultValue={schoolProfileData?.school_name}
              label="Name"
            />
            <TextInputValue
              name="country"
              label="Country"
              defaultValue={TitleCase(schoolProfileData?.country)}
            />
            <TextInputValue name="email" label="Email" defaultValue={schoolProfileData?.email} />
            <TextInputValue
              type="number"
              name="phone_number"
              label="Phone Number"
              defaultValue={schoolProfileData?.phone_number}
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
