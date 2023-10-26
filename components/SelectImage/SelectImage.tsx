'use client'

import React, { useState } from 'react'
import styles from './SelectImage.module.css'
import Image from 'next/image'
import userIcon from '/public/assets/images/userIcon.png'

interface SelectImageProps {
  name?: string
  setFile?: React.Dispatch<React.SetStateAction<File | null>>
}
const SelectImage = ({ name, setFile }: SelectImageProps) => {
  const [preview, setPreview] = useState<string|null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files !== null){
      const selected = e.target.files[0]
      const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
      if (selected && ALLOWED_TYPES.includes(selected.type)) {
        let reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result)
        }
        reader.readAsDataURL(selected)
        setFile(selected)
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
          required
        />
      </div>
    </>
  )
}

export default SelectImage