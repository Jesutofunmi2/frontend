import React, { ChangeEvent } from 'react'
import styles from './textInput.module.css'
interface InputProps {
  label: string
  required?: boolean
  readOnly?: boolean
  name?: string
  defaultValue?: string
  type?: string
  placeholder?: string
  register?: any
}
const TextInput = ({
  label,
  register,
  defaultValue,
  placeholder,
  type,
  name,
  required,
  readOnly,
}: InputProps) => {
  return (
    <>
      <div className={styles.inputWrap}>
        <label className="text-sm font-bold" htmlFor={name}>
          {label}
        </label>
        <input
          {...register(name)}
          defaultValue={defaultValue}
          type={type ? type : 'text'}
          placeholder={placeholder}
          className={styles.input}
          required={required}
          readOnly={readOnly}
        />
      </div>
    </>
  )
}

export default TextInput
