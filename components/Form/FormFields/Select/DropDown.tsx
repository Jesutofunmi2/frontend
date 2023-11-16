import React from 'react'
import styles from './select.module.css'
import AsyncSelect, { LoadingIndicatorProps, StylesConfig } from 'react-select'
import { Loader, Spinner } from '@/components/Loader/Loader'

interface SelectProps {
  label: string
  options: any
  onChange: (value: any, actionMeta:any) => void
  defaultValue?: any
  placeholder?: string
  isLoading?: boolean
  value?: any
}
export const reactSelectCustomStyles = (): StylesConfig => ({
  loadingIndicator: () => {
    return {
      backgroundImage: `url("../../../../public/assets/images/loading-gif.gif")`,
    }
  },
})
const DropDown = ({
  placeholder,

  value,
  isLoading,
  label,
  onChange,
  defaultValue,
  options,
}: SelectProps) => {
  const LoadingIndicator = (props: LoadingIndicatorProps) => {
    return <Spinner />
  }
  return (
    <>
      <div className={styles.selectWrap}>
        <label>{label}</label>
        <AsyncSelect
          className={styles.input}
          defaultValue={defaultValue}
          onChange={onChange}
          options={options}
          value={value}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? '#3753b8' : '#FFB700',
              minHeight: '49px',
              borderRadius: '14px',
              fontSize: '15px',
              boxShadow: 'none',
              borderWidth: '1px',
            }),
          }}
          placeholder={placeholder}
          required
          isOptionDisabled={(option) => option.disabled}
          isLoading={isLoading}
          noOptionsMessage={() => `No ${label} found`}
          components={{ LoadingIndicator }}
          // isMulti
        />
      </div>
    </>
  )
}

export default DropDown
