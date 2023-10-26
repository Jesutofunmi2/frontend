'use client'

import React from 'react'
import styles from './page.module.css'
import SelectImage from '@/components/SelectImage/SelectImage'
import TextInput from '@/components/Form/FormFields/TextInput/TextInput'
import Button from '@/components/Button/Button'
import { useSelector } from 'react-redux'

const SchoolProfile = () => {
  const schoolData = useSelector((state) => state?.user?.currentSchool?.data)

  // console.log(schoolData)
  // HANDLE INPUT FIELDS
  // const handleChange = (e) => {
  //   const data = { ...payloadData };
  //   data[e.target.name] = e.target.value;
  //   setPayloadData(data);
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const data = e.target.value
    // // const data = { ...payloadData };
    // // data[e.target.name] = e.target.value;
    // setPayloadData({ ...payloadData },[e.target.name]:data);
  };

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>{schoolData?.school_name}</h3>
        <div>
          {/* <div className={styles.imageWrap}>
            <SelectImage />
          </div> */}

          <div className={styles.details}>
            <TextInput
              title="Name"
              defaultValue={schoolData?.school_name}
              handleChange={handleChange}
              readOnly={true}
            />
            <TextInput
              title="Country"
              defaultValue={schoolData?.country}
              handleChange={handleChange}
              readOnly={true}
            />
            <TextInput
              title="Email"
              defaultValue={schoolData?.email}
              handleChange={handleChange}
              readOnly={true}
            />
            <TextInput
              title="Phone Number"
              defaultValue={schoolData?.phone_number}
              handleChange={handleChange}
              readOnly={true}
            />
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

export default SchoolProfile
