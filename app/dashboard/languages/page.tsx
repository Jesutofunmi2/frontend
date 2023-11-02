'use client'

import React from 'react'
import styles from './page.module.css'
import LanguageCard from '@/components/Card/languageCard/LanguageCard'
import { useGetLanguages } from '@/services/api/languages'
import { Loader } from '@/components/Loader/Loader'
import { Fade } from 'react-awesome-reveal'
import { useSelector } from 'react-redux'
import { userData } from '@/services/redux/features/userSlice'
import { ILanguage } from '@/types/languages.'

const Languages = () => {
  const { data: languages, isLoading, error } = useGetLanguages()
  const countDown = Number(useSelector(userData).currentUser?.data.count_down!)
  if (!languages) return null
  if (isLoading) return <Loader />
  if (error) return <p>error page</p>
  return (
    <>
      <div>
        <div className={styles.textWrap}>
          <h2>Languages</h2>
          <p>Choose your native language</p>
        </div>
        <div className={styles.wrapper}>
          {/* <Fade
            cascade
            damping={0.1}
            style={{ maxWidth: '180px', width: '100%' }}
            direction="right"
          > */}
          {languages?.map((card:ILanguage) => <LanguageCard key={card.id} card={card} />)}
          {/* </Fade> */}
        </div>
      </div>
    </>
  )
}

export default Languages
