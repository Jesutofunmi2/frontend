import React from 'react'
import styles from './lessonCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { Lesson } from '@/types/lessontopic'

interface LessonCardProps {
  lesson: Lesson
  languageID: number
  setImageLoaded: React.Dispatch<React.SetStateAction<null>>
  language: string
}
const LessonsCard = ({ lesson, languageID, setImageLoaded, language }: LessonCardProps) => {
  // const percentageCalc = lesson?.percentage * 100

  return (
    <>
      <Link
        href={{
          pathname: `/dashboard/languages/lessons/${lesson?.id}`,
          query: {
            language: language,
            lang: languageID,
            lesson: lesson?.id,
            type: lesson?.question_type,
          },
        }}
        className={styles.lessonCardContainer}
      >
        <Image
          src={lesson?.media_url || ''}
          className={styles.img}
          width={400}
          height={100}
          alt="home image"
          // onLoad={() => setImageLoaded(1)}
        />
        <div className={styles.title}>{lesson?.title}</div>
        <hr className={styles.break} />
        <div className={styles.progressWrap}>
          <div className={styles.span}>
            <div
              style={{
                backgroundColor: 'green',
                borderRadius: '10px',
                width: `${lesson?.percentage > 100 ? 100 : lesson?.percentage}%`,
                height: '100%',
              }}
            ></div>
          </div>

          <p className={styles.percentage}>{lesson?.percentage}%</p>
        </div>
      </Link>
    </>
  )
}

export default LessonsCard
