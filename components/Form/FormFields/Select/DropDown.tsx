import React from 'react'
import styles from './select.module.css'
import Select from 'react-select'

interface SelectProps {
  label: string
  options: any
  onChange: (value: any) => void
  defaultValue: any
}
const DropDown = ({ label, onChange, defaultValue, options }: SelectProps) => {
  return (
    <>
      <div className={styles.selectWrap}>
        <label>{label}</label>
        <Select
          className={styles.input}
          defaultValue={defaultValue}
          onChange={onChange}
          options={options}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? 'grey' : '#F19C00',
              height: '43px',
              borderRadius: '14px',
            }),
          }}
          required
        />
      </div>
    </>
  )
}

export default DropDown
