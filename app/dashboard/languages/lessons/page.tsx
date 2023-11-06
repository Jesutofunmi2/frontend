'use client'

import React, { useState } from 'react'
import styles from './page.module.css'
import LessonsCard from '@/components/Card/lessonCard/LessonCard'
import { useGetLessons } from '@/services/api/lessons'
import { useSearchParams } from 'next/navigation'
import BackNavigation from '@/components/BackNavigation/BackNavigation'
import { Fade } from 'react-awesome-reveal'
import { Loader } from '@/components/Loader/Loader'
import { Lesson } from '@/types/lessontopic'

const Lessons = () => {
  const searchParams = useSearchParams()
  const languageID = Number(searchParams.get('lang'))
  const { data: languageLessons, isLoading, error } = useGetLessons(languageID)
  const language = String(searchParams.get('language'))
  const [imageLoaded, setImageLoaded] = useState<null>(null)
  // const lessonData = useSelector((state) => state?.lessons?.data);
  // useSelector(userData).currentUser?.data.count_down!

  if (!languageLessons) return null
  if (isLoading) return <Loader />
  if (error) return <p>error page</p>

  return (
    <>
      <div className={styles.lessons}>
        <div className={styles.headerWrap}>
          <span className={styles.backIcon}>
            <BackNavigation />
          </span>
          <h1 className="text-xl font-bold">Lessons</h1>
        </div>
        <div className={styles.wrapper}>
          {languageLessons?.map((lesson: Lesson) => (
            <LessonsCard
              key={lesson?.id}
              lesson={lesson}
              languageID={languageID}
              language={language}
              setImageLoaded={setImageLoaded}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Lessons
