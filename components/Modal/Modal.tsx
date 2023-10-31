'use client'

import React, { useEffect } from 'react'
import styles from './modal.module.css'
import { RiCloseCircleFill } from 'react-icons/ri'
import ReactDOM from 'react-dom'

interface ModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: JSX.Element
}
const Modal = ({ open, setOpen, children }: ModalProps) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return ReactDOM.createPortal(
    <>
      <div className={open ? styles.overlay : styles.ov}>
        <div className={open === true ? styles.cont : styles.close}>
          <div onClick={() => setOpen(false)} className={styles.closeIcon}>
            <RiCloseCircleFill size={50} color="white" />
          </div>
          {children}
        </div>
      </div>
    </>,
    document.getElementById('modal-root')!
  )
}

export default Modal
