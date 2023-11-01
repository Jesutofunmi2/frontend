import React from 'react'
import styles from './textInput.module.css'
interface InputProps {
  label: string
  name: string
  defaultValue?: string
  type: string
  placeholder: string
  register: any
  style?: any
  Icon?: JSX.Element
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
  style,
  Icon,
}: InputProps) => {
  return (
    <>
      <div className={styles.inputWrap}>
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
        <input
          style={style}
          {...register}
          defaultValue={defaultValue}
          type={type ? type : 'text'}
          placeholder={placeholder}
          className={styles.input}
          required
        />
        {/* {Icon? <span>{Icon}</span>: null} */}
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
