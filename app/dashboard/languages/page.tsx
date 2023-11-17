'use client'

import React from 'react'
import styles from './page.module.css'
import LanguageCard from '@/components/Card/languageCard/LanguageCard'
import { useGetLanguages } from '@/services/api/languages'
import { Loader } from '@/components/Loader/Loader'
import { Fade } from 'react-awesome-reveal'
import { useSelector } from 'react-redux'
import { ILanguage } from '@/types/languages'
import { userData } from '@/services/redux/features/userSlice'
import { toast } from 'react-toastify'

const Languages = () => {
  const countDown = useSelector(userData).currentUser?.data.count_down
  const { data: languages, isLoading, error } = useGetLanguages()

  if (!languages) return null
  if (isLoading) return <Loader />
  if (error) return <p>error page</p>

  if (countDown) {
    toast.warning(<p className="text-lg">{countDown}</p>, {
      position: toast.POSITION.TOP_RIGHT,
      toastId: 'countdown_student',
      theme: 'colored',
      autoClose: false,
    })
  }

  return (
    <>
      <div>
        <div className={styles.textWrap}>
          <h2>Languages</h2>
          <p>Choose your native language</p>
        </div>
        <div className="mt-10 gap-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          {/* <Fade
           cascade
           damping={0.1}
           style={{ maxWidth: '180px', width: '100%' }}
           direction="right"
         > */}
          {languages?.map((card: ILanguage) => <LanguageCard key={card.id} card={card} />)}
          {/* </Fade> */}
        </div>
      </div>
    </>
  )
}

export default Languages
