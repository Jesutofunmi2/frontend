import React from 'react'
import styles from './select.module.css'
import Select from 'react-select'

interface SelectProps {
  label: string
  id: string
  options: any
  defaultValue:string
  value: any
  onChange: (e: any) => void
  onBlur: (e: any) => void
}
const DropDown = ({ id, label, defaultValue, options, value, onChange, onBlur }: SelectProps) => {
  return (
    <>
      <div className={styles.selectWrap}>
        <label>{label}</label>
        <Select
                id={id}
                value={value}
                defaultValue={defaultValue}
                options={options}
                onChange={onChange}
                onBlur={onBlur}
                required
              />
      </div>
    </>
  )
}

export default DropDown 
