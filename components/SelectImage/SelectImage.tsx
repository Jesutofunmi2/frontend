'use client'

import React, { useState } from 'react'
import styles from './SelectImage.module.css'
import Image from 'next/image'
import userIcon from '/public/assets/images/userIcon.png'
import { ToastContainer,toast } from 'react-toastify'
interface SelectImageProps {
  name?: string
  setFile?: React.Dispatch<React.SetStateAction<File | string>>
}
const SelectImage = ({ name, setFile }: SelectImageProps) => {
  const [preview, setPreview] = useState<string|any>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files !== null){
      const selectedFile = e.target.files[0]
      const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
      if (selectedFile.size>1000000) {
        toast.error('Image size too large', {
          position: toast.POSITION.TOP_RIGHT,
        })
        return
      }
      if (selectedFile && ALLOWED_TYPES.includes(selectedFile.type)) {
        let reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result)
        }
        reader.readAsDataURL(selectedFile)
       
        // console.log(selectedFile)
        setFile(selectedFile)
      } else {
        // setError(true);
      }
    }
    
  }

  return (
    <>
      <div>
        <label htmlFor="imgInput">
          {preview ? (
            <Image src={preview} width="100" height="100" alt="logo" className={styles.userPhoto} />
          ) : (
            <Image src={userIcon} alt="image" className={styles.userIcon} />
          )}
        </label>
        <input
          type="file"
          id="imgInput"
          name={name}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
          // required
        />
      </div>
      <ToastContainer/>
    </>
  )
}

export default SelectImage
