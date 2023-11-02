import React from 'react'
import styles from './select.module.css'
import AsyncSelect, { LoadingIndicatorProps, StylesConfig } from 'react-select'
import { Loader, Spinner } from '@/components/Loader/Loader'

interface SelectProps {
  label: string
  options: any
  onChange: (value: any) => void
  defaultValue: any

  isLoading?:boolean
}
export const reactSelectCustomStyles = (): StylesConfig => ({
  loadingIndicator: () => {
    return {
      backgroundImage:`url("../../../../public/assets/images/loading-gif.gif")`,
    };
  },
})
const DropDown = ({ isLoading,label, onChange, defaultValue, options }: SelectProps) => {
  const LoadingIndicator = (props: LoadingIndicatorProps) => {
    return (
     <Spinner/>
    );
  };
  return (
    <>
      <div className={styles.selectWrap}>
        <label>{label}</label>
        <AsyncSelect
          className={styles.input}
          defaultValue={defaultValue}
          onChange={onChange}
          options={options}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? 'grey' : '#F19C00',
              minHeight: '49px',
              borderRadius: '14px',
              fontSize:"15px"
            
            }),
          }}
          required
          isLoading={isLoading}
          noOptionsMessage={() => `No ${label} found`}
          // LoadingMessage={() => 'searching...'}
          components={{ LoadingIndicator }}
          
        />
      </div>
    </>
  )
}

export default DropDown
