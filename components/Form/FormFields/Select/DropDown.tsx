import React from 'react'
import styles from './select.module.css'
import Select, { GroupBase } from 'react-select'

interface SelectProps {
  label: string
  options: any
  onChange: (value: any) => void
  defaultValue: string
}
const DropDown = ({ label, onChange, defaultValue, options }: SelectProps) => {
  return (
    <>
      <div className={styles.selectWrap}>
        <label>{label}</label>
        <Select defaultValue={defaultValue} onChange={onChange} options={options} required />
      </div>
    </>
  )
}

export default DropDown
