import React from 'react'
import styles from './textInput.module.css'
interface InputProps {
  label: string
  name: string
  defaultValue?: string
  type: string
  placeholder: string
  register: any
}
interface InputValueProps {
  label: string
  defaultValue?: string
  name: string
 
}
export const TextInput = ({
  label,
  register,
  defaultValue,
  placeholder,
  type,
  name,
}: InputProps) => {
  return (
    <>
      <div className={styles.inputWrap}>
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
        <input
          {...register}
          defaultValue={defaultValue}
          type={type ? type : 'text'}
          placeholder={placeholder}
          className={styles.input}
        />
      </div>
    </>
  )
}

export const TextInputValue = ({ label, name, defaultValue }: InputValueProps) => {
  return (
    <>
      <div className={styles.inputWrap}>
        <label className="text-sm font-bold" htmlFor={name}>
          {label}
        </label>
        <input defaultValue={defaultValue} type={'text'} className={styles.input} readOnly />
      </div>
    </>
  )
}
