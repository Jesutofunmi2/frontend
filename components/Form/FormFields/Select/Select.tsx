import React from 'react'
import styles from './select.module.css'

interface SelectProps {
  title: string
  options: any
  name: string
  defaultValue: string
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
const Select = ({ title, options, name, defaultValue, handleChange }: SelectProps) => {
  return (
    <>
      <div className={styles.selectWrap}>
        <span>{title ? title : null}</span>
        <select
          name={name}
          defaultValue={defaultValue}
          className={styles.select}
          onChange={(e) => handleChange(e)}
          required
        >
          <option value="">{'Select'}</option>
          {options?.map((item: any) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default Select
