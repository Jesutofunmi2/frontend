import React from 'react'
import styles from './textInput.module.css'
import { FieldHookConfig, useField, Field } from 'formik'

interface LabelProps {
  label: string
}
const TextInput = ({ label, ...props }: LabelProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props)
  // console.log(props)
  return (
    <>
      <div className={styles.inputWrap}>
        <label className="text-sm font-bold" htmlFor={props.id || props.name}>
          {label}
        </label>
        <Field
          {...field}
          placeholder={props.placeholder}
          className={styles.input}
          required
        />
        {/* <input
      //  value={defaultValue}
          type={type ? type : 'text'}
          name={name}
          placeholder={placeholder ? placeholder : ''}
          onChange={(e) => (handleChange ? handleChange(e) : null)}
          className={styles.input}
          // onKeyDown={(e) => (type === "text" ? handleTextInput(e) : null)}
          required
          readOnly={readOnly}
        /> */}
      </div>
    </>
  )
}

export default TextInput
