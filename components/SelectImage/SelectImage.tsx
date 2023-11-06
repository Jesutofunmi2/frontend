'use client'

import React, { useState } from 'react'
import styles from './SelectImage.module.css'
import Image from 'next/image'
import userIcon from '/public/assets/images/userIcon.png'
import { ToastContainer, toast } from 'react-toastify'
import { BiErrorCircle } from 'react-icons/bi'
interface SelectImageProps {
  register: any
  clearErrors: () => void
  name?: string
  errors: any
  preview: string
  setPreview: React.Dispatch<any>
  setFile: React.Dispatch<React.SetStateAction<File | null | any>>
}
const SelectImage = ({
  name,
  clearErrors,
  errors,
  setFile,
  setPreview,
  preview,
  register,
}: SelectImageProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors()
    if (e.target.files !== null) {
      const selectedFile = e.target.files[0]
      const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
      if (selectedFile.size > 1000000) {
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
        setFile(selectedFile)
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
            <Image
              src={userIcon}
              width="100"
              height="100"
              alt="image"
              className={styles.userIcon}
            />
          )}
        </label>
        <input
          {...register}
          type="file"
          id="imgInput"
          name={name}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => handleImageChange(e)}
        />
      </div>
      {errors?.image_url && errors?.image_url.type === 'required' ? (
        <div className="text-error flex items-center gap-2 absolute bottom-0 right-44">
          <BiErrorCircle /> <p className=" text-error">Upload image!</p>
        </div>
      ) : null}
      <ToastContainer />
    </>
  )
}

export default SelectImage
