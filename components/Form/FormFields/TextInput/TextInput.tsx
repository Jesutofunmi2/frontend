import React, { ChangeEvent } from 'react'
import styles from './textInput.module.css'
import { FieldHookConfig, useField, Field } from 'formik'

interface InputProps {
  label: string
  name?: string
  id?: string
  required?: boolean
  readOnly?: boolean
  handleChange?: (e:React.FormEvent<HTMLInputElement>) => void
  defaultValue?: string
  type?: string
  placeholder?: string
}
const TextInput = ({
  label,
  handleChange,
  defaultValue,
  placeholder,
  type,
  name,
  required,
  id,
  readOnly,
  ...props
}: InputProps) => {


  return (
    <>
      <div className={styles.inputWrap}>
        <label className="text-sm font-bold" htmlFor={id || name}>
          {label}
        </label>
        <input
          defaultValue={defaultValue}
          type={type? type:"text"}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          className={styles.input}
          // onKeyDown={(e) => (type === "text" ? handleTextInput(e) : null)}
          required
          readOnly={readOnly}
        />
      </div>
    </>
  )
}

export default TextInput
