'use client'

import React from 'react'
import styles from './button.module.css'

interface ButtonProps {
  type?: string
  text?: string|JSX.Element
  color?: string
  backgroundColor?: string
  size?: string
  disabled?: boolean
  handleClick?: () => void
}

const Button = ({ type, text, color, backgroundColor, disabled, handleClick }: ButtonProps) => {
  return (
    <button
      style={{
        background: `${backgroundColor}`,
        color: `${color}`,
        maxWidth: '200px',
        width: '200px',
      }}
      onClick={() => (handleClick ? handleClick() : null)}
      className={styles.btn}
      type={type === 'submit' ? 'submit' : 'button'}
      disabled={disabled}
    >
      {text ? text : 'Button'}
    </button>
  )
}

export default Button
