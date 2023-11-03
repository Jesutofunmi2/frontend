'use client'

import LessonGameOne from '@/components/LessonGame/LessonGameOne/LessonGameOne'
import LessonGameTwo from '@/components/LessonGame/LessonGameTwo/LessonGameTwo'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { useGetLessonQuestions } from '@/services/api/lessonGame'
import { useSearchParams } from 'next/navigation'
import { Loader } from '@/components/Loader/Loader'
import ProgressBar from '@/components/ProgressBar/ProgressBar'
import { AiFillHeart } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { addFavourite } from '@/services/api/favourite'
import LessonGameThree from '@/components/LessonGame/LessonGameThree/LessonGameThree'
import BackNavigation from '@/components/BackNavigation/BackNavigation'
import { userData } from '@/services/redux/features/userSlice'
import { Favourite } from '@/types/favourite'
import { LessonQuestion } from '@/types/lessontopic'

const LessonGame = () => {
  const studentID = Number(useSelector(userData).currentUser?.data?.student_id!)
  const searchParams = useSearchParams()
  const [questionIndex, setQuestionIndex] = useState(0)
  const [currentQtn, setCurrentQtn] = useState<LessonQuestion|null>(null)
  const [favourite, setFavourite] = useState<Favourite[]>([])
  const languageID = Number(searchParams.get('lang'))
  const lessonID = String(searchParams.get('lesson'))
  const type = searchParams.get('type')
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { data: lessonQuestions, isLoading, error } = useGetLessonQuestions(languageID, lessonID)
  if (!lessonQuestions) return null
  if (isLoading) return <Loader />
  if (error) return <p>error page</p>

  const currentPercentage = Math.floor((100 / lessonQuestions?.length) * questionIndex)

  const handleFavourite = async (arg: any) => {
    const isExisitngFavourite = favourite?.find((faved) => {
      return faved.id === arg.id
    })

    if (!isExisitngFavourite) {
      setFavourite((current) => [...current, { id: arg?.id }])

      let res = await addFavourite({
        student_id: studentID,
        question_id: arg.id,
      })
    } else {
      const removeFave = favourite.filter((item) => item.id !== arg?.id)
      setFavourite(removeFave)
    }
  }

  // GET FAVOURITED
  const faved = favourite?.find((item: any) => item?.id === currentQtn?.id)

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.gameWrap}>
          <BackNavigation />
          {/* PROGRESSS BAR, HEART AND PERCENTAGE  */}
          <div className={styles.topWrap}>
            <span className={styles.percentage}>{currentPercentage || 0}%</span>
            <ProgressBar percentage={currentPercentage} />
            <AiFillHeart
              size={40}
              color={faved ? 'red' : '#CBCBCB'}
              onClick={() => handleFavourite(currentQtn)}
            />
          </div>

          {type === 'multiple' || type === 'multiple_bronze' ? (
            <LessonGameThree
              question={lessonQuestions}
              questionIndex={questionIndex}
              setQuestionIndex={setQuestionIndex}
              setCurrentQtn={setCurrentQtn}
              topicID={lessonID}

            />
          ) : type === 'puzzle' || type === 'scramble' ? (
            <LessonGameOne
              topicID={lessonID}
              question={lessonQuestions}
              questionIndex={questionIndex}
              setQuestionIndex={setQuestionIndex}
              setCurrentQtn={setCurrentQtn}
            />
          ) : (
            <LessonGameTwo
              topicID={lessonID}
              question={lessonQuestions}
              questionIndex={questionIndex}
              setQuestionIndex={setQuestionIndex}
              setCurrentQtn={setCurrentQtn}
              currentQtn={currentQtn}
            />
          )}
        </div>
      )}
    </>
  )
}

export default LessonGame
