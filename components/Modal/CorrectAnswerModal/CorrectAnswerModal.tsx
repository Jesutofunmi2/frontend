'use client'

import React, { useEffect } from 'react'
import styles from './correctAnswerModal.module.css'
import ReactDOM from 'react-dom'
import Image from 'next/image'
import correctConfetti from '../../../public/assets/images/correctConfetti.jpg'
import { Bounce } from 'react-awesome-reveal'
import { usePathname, useRouter } from 'next/navigation'

interface CorrectAnswerModalProps {
  closeModal: (event:boolean)=>void
}
const CorrectAnswerModal = ({ closeModal }: CorrectAnswerModalProps) => {
  const router = useRouter()
  const pathname = usePathname()
  // Get url path
  const path = pathname.split('/')[2]



  const handleClick = () => {
    if (path === 'video-course') {
      closeModal(false)
    } else {
      router.back()
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay}>
        <Bounce style={{ width: '100%' }}>
          <div className={styles.cont}>
            {/* <div onClick={() => closeModal(false)} className={styles.closeIcon}>
              <RiCloseCircleFill size={50} color="white" />
            </div> */}

            <div className={styles.container}>
              <p className={styles.congratsText}>Yay! Quiz Completed!</p>
              <Image
                src={correctConfetti}
                width="180"
                height="180"
                className={styles.image}
                alt="congrats"
              />
              <button className={styles.nextBtn} onClick={() => handleClick()}>
                Awesome!
              </button>
            </div>
          </div>
        </Bounce>
      </div>
    </>,
    document.getElementById('modal-root')!
  )
}

export default CorrectAnswerModal
