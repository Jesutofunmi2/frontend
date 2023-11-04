'use client'

import React, { useEffect, useState } from 'react'
import styles from './lessonGameTwo.module.css'
import Button from '@/components/Button/Button'
import FlashCard from '../FlashCard/FlashCard'
import { Fade } from 'react-awesome-reveal'
import { answeredQuestion, checkAnswer } from '@/services/api/lessonGame'
import wrongAnswerSound from '@/public/assets/audios/notCorrect.mp3'
import correctAnswerSound from '@/public/assets/audios/yay.mp3'
import { useSelector } from 'react-redux'
import CorrectAnswerModal from '@/components/Modal/CorrectAnswerModal/CorrectAnswerModal'
import { userData } from '@/services/redux/features/userSlice'
import { LessonQuestion, QuestionOptions } from '@/types/lessontopic'
import { Loader, Spinner } from '@/components/Loader/Loader'

interface LessonGameTwoProps {
  question: LessonQuestion[]
  questionIndex: number
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>
  setCurrentQtn: React.Dispatch<React.SetStateAction<LessonQuestion>>
  topicID: string
  currentQtn: LessonQuestion
}
const LessonGameTwo = ({
  question,
  questionIndex,
  setQuestionIndex,
  setCurrentQtn,
  topicID,
  currentQtn,
}: LessonGameTwoProps) => {
  const studentID = useSelector(userData).currentUser?.data.student_id
  const [selected, setSelected] = useState('')
  const [buttonText, setButtonText] = useState('Check')
  const [isLoading, setLoading] = useState(false)


  useEffect(() => {
    setCurrentQtn(question[questionIndex])
    if (isLoading) {
      const fetchAnswer = async () => {
        let res = await checkAnswer({
          question_id: currentQtn?.id,
          optionIds: [`${selected}`],
        })
        if (res.is_correct) {
          setButtonText('Correct')
          const audio = new Audio(correctAnswerSound)
          audio.play()
          const timer = setTimeout(() => {
            setButtonText('Next')
            nextQuestion()
          }, 1700)

          return () => clearTimeout(timer)
        } else {
          setButtonText('Wrong')
          const audio = new Audio(wrongAnswerSound)
          audio.play()
          setSelected('')
          const timer = setTimeout(() => {
            setButtonText('Check')
          }, 1700)
          return () => clearTimeout(timer)
        }
      }
      fetchAnswer()
    }
    setLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, questionIndex, currentQtn])

  if (!currentQtn) return <Loader />
  const nextQuestion = () => {
    setQuestionIndex((prevState) => prevState + 1)
    setCurrentQtn(question[questionIndex])
    setButtonText('Check')
    setSelected('')
  }

  // CHECK ANSWER FUNCTION
  const handleCheckAnswer = () => {
    setLoading(true)
  }

  return (
    <>
      <div className={styles.LGTwoContainer}>
        <div className={styles.wrapper}>
      
          <div className={styles.textWrap}>
            <h3>Question No. {questionIndex + 1}</h3>
          </div>

          <div className={styles.questionWrap}>
            <h3>{currentQtn?.title}</h3>
            <div className={styles.flashcardWrap}>
              {/* <Fade
                cascade
                damping={0.1}
                style={{ maxWidth: "180px", width: "100%" }}
                duration={1500}
                direction="right"
              > */}
              {currentQtn?.options?.map((option: QuestionOptions) => (
                <FlashCard
                  setSelected={setSelected}
                  selected={selected}
                  option={option}
                  key={option.id}
                />
              ))}
              {/* </Fade> */}
            </div>
          </div>
          {/* {openCorrectModal ? (
            <button className={styles.nextBtn} onClick={() => handleNext()}>
              Next
              <HiOutlineArrowNarrowRight size={30} />
            </button>
          ) : ( */}

          <Button
            handleClick={() => handleCheckAnswer()}
            backgroundColor={
              buttonText === 'Wrong'
                ? 'red'
                : buttonText === 'Correct' || buttonText === 'Next'
                ? 'green'
                : buttonText === 'Check'
                ? '#FFC400'
                : ''
            }
            text={buttonText}
            disabled={!selected || buttonText === 'Correct' || buttonText === 'Wrong'}
          />
        </div>
      </div>
      {/* {questionIndex + 1 > question?.length ? <CorrectAnswerModal /> : null} */}
    </>
  )
}

export default LessonGameTwo
