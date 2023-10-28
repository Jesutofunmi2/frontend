import React, { useState } from 'react'
import styles from './select.module.css'
import Select, { SingleValue } from 'react-select'
import { IClass } from '@/types/class'

interface Options {
  label: string
value: IClass
}

interface SelectProps {
  title: string
  classOptions: Options[]
  setSelectedOption: any
  value: IClass
}

const Select2 = ({
  title,
  classOptions,
  setSelectedOption,
  value,
}: SelectProps) => {
  const handlechange = (newValue:SingleValue<Options>) => {
    setSelectedOption(newValue?.value)
  }

  // const kpo =  classOptions?.find((c) => {
  //   return c.value === value
  // })

  // console.log(kpo)

  // Select component styles
  const colourStyles = {
    control: (baseStyles: any, state: any) => ({
      ...baseStyles,
      borderColor: '#F19C00',
      height: '45px',
      borderRadius: '15px',
      width: '100%',
    }),
  }
  return (
    <>
      <div>
        <p className={styles.label}>{title}</p>
        <Select
          required
          onChange={handlechange}
          options={classOptions}
          value={classOptions?.find((c) => c.value === value)}
          styles={colourStyles}
        />
      </div>
    </>
  )
}

export default Select2
