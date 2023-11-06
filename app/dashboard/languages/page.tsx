'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import LanguageCard from '@/components/Card/languageCard/LanguageCard'
import { useGetLanguages } from '@/services/api/languages'
import { Loader } from '@/components/Loader/Loader'
import { Fade } from 'react-awesome-reveal'
import { useSelector } from 'react-redux'
import { userData } from '@/services/redux/features/userSlice'
import { ILanguage } from '@/types/languages.'
import { BaselineFormStudent } from '@/components/Form/Forms/BaselineForm/BaselineForm'
import { toast } from 'react-toastify'

const Languages = () => {
  const { data: languages, isLoading, error } = useGetLanguages()
  const user = useSelector(userData).currentUser?.data!
  const [survey, setSurvey] = useState<boolean>(user.survey_status)
  // const surveyStatus = user.survey_status;
  // const countDown = Number(useSelector(userData).currentUser?.data.count_down!)

  // useEffect(() => {
  //   if (!user.survey_status) {
  //     setSurvey(false)
  //   } else {
  //     setSurvey(true)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [survey, user.survey_status])
  console.log(user)
  if (!languages) return null
  if (isLoading) return <Loader />
  if (error) return <p>error page</p>

  // if (!user.survey_status) {
  //   return <BaselineFormStudent />
  // }
  // if (user.count_down){
  //   toast.error(`${user.count_down}`, {
  //     position: toast.POSITION.TOP_RIGHT,
  //     autoClose: false,
  //     theme: 'colored',
  //   })
  // }
  return (
    <>
      {survey ? (
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
            {languages?.map((card: ILanguage) => <LanguageCard key={card.id} card={card} />)}
            {/* </Fade> */}
          </div>
        </div>
      ) : (
        <BaselineFormStudent setSurvey={setSurvey} />
      )}
    </>
  )
}

export default Languages
