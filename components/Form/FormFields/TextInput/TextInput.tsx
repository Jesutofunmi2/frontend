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
  clearErrors?: () => void
  errors?: any
}
interface InputValueProps {
  label: string
  defaultValue?: string
  name: string
  type?:string
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
  clearErrors,
  errors,
}: InputProps) => {
  return (
    <>
      <div className={styles.inputWrap}>
        <label className="" htmlFor={name}>
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
      {errors?.term && errors?.term.type === 'required' ? (
        <div className="text-error flex items-center gap-2 absolute bottom-0 right-44">
    <p className=" text-error">Upload image!</p>
        </div>
      ) : null}
    </>
  )
}

export const TextInputValue = ({ label, name, type,defaultValue }: InputValueProps) => {
  return (
    <>
      <div className={styles.inputWrap}>
        <label className="text-sm font-bold" htmlFor={name}>
          {label}
        </label>
        <input defaultValue={defaultValue} type={type?type:'text'} className={styles.input} readOnly />
      </div>
    </>
  )
}
