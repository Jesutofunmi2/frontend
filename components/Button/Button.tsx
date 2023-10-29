'use client'

import React from 'react'
import styles from './button.module.css'

interface ButtonProps {
  type?:string
  text?: string
  color?: string
  backgroundColor?: string
  width?: string
  height?: string
  size?: string
  maxWidth?: string
  disabled?: boolean
  handleClick?: () => void
}

const Button = ({
  type,
  text,
  color,
  backgroundColor,
  width,
  height,
  size,
  maxWidth,
  disabled,
  handleClick,
}: ButtonProps) => {
  return (
    <button
      style={{
        background: `${backgroundColor}`,
        color: `${color}`,
        maxWidth: `${maxWidth}`,
        width: `${width}`,
        height: `${height}`,
        fontSize: `${size}`,
      }}
      onClick={() => (handleClick ? handleClick() : null)}
      className={styles.btn}
      type={type ==="submit"? "submit":"button"}
      disabled={disabled}
    >
      {text ? text : 'Button'}
    </button>
  )
}

export default Button
