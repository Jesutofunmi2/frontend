'use client'

import React, { useState } from 'react'
import styles from './bulkUpload.module.css'
import Modal from '../Modal/Modal'
import { AiOutlineFileAdd, AiOutlineCloudDownload } from 'react-icons/ai'
import Button from '../Button/Button'

const BulkUpload = () => {
  const [file, setFile] = useState<File | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      const selected = e.target.files[0]
      setFile(selected)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>Upload File</h3>
        <hr />
        <div className={styles.templateBtn}>
          <Button
            text="Download template "
            backgroundColor="green"
          />
          {/* <AiOutlineCloudDownload /> */}
        </div>
        <div className={styles.wrapper}>
          <label htmlFor="fileInput" className={styles.selectWrap}>
            <div className={styles.selectBox}>
              <AiOutlineFileAdd color="green" />
            </div>
          </label>
          <input
            type="file"
            id="fileInput"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            style={{ display: 'none' }}
            onChange={handleImageChange}
            required
          />
          {file ? <span className={styles.text}>{file?.name}</span> : null}
        </div>
        <div className={styles.saveBtn}>
          <Button  text="Save" />
        </div>
      </div>
    </>
  )
}

export default BulkUpload
