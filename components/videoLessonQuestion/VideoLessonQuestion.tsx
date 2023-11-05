'use client'

import React, { useEffect, useState } from 'react'
import styles from './videoLessonQuestion.module.css'
import { Fade } from 'react-awesome-reveal'
import Button from '../Button/Button'
import { checkAnswer } from '@/services/api/lessonGame'
import wrongAnswerSound from '@/public/assets/audios/notCorrect.mp3'
import clickSound from '@/public/assets/audios/click.mp3'
import correctAnswerSound from '@/public/assets/audios/yay.mp3'
import CorrectAnswerModal from '../Modal/CorrectAnswerModal/CorrectAnswerModal'
import { LessonQuestion, QuestionOptions } from '@/types/lessontopic'

interface VideoLessonQuestionProps {
  question: LessonQuestion[]
  questionIndex: number
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>
  setQuestionsPopup: React.Dispatch<React.SetStateAction<boolean>>
}
const VideoLessonQuestion = ({
  question,
  questionIndex,
  setQuestionIndex,
  setQuestionsPopup,
}: VideoLessonQuestionProps) => {
  const [selected, setSelected] = useState('')
  const [closeModal, setCloseModal] = useState(true)

  const [buttonText, setButtonText] = useState('Check')
  const currentQuestion = question[questionIndex]
  const [isLoading, setLoading] = useState(false)

  console.log(question)

  // // CORRECT AND WRONG ANSWER CONDITION
  useEffect(() => {
    if (isLoading) {
      const fetchAnswer = async () => {
        let res = await checkAnswer({
          question_id: currentQuestion?.id,
          optionIds: [`${selected}`],
        })
        if (res.is_correct) {
          setButtonText('Correct')
          const audio = new Audio(correctAnswerSound)
          audio.play()
          const timer = setTimeout(() => {
            setButtonText('Next')
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
  }, [currentQuestion?.id, isLoading, selected])

  // FUNCTION TO AUTO-PLAY QUESTION WHEN YOU LAND ON PAGE AND WHEN YOU MOVE TO NEXT QUESTION

  // SELECT ANSWER FUNCTION
  const selectAnswer = (id: string) => {
    setSelected(id)
    const audio = new Audio(clickSound)
    audio.play()
  }

  const nextQuestion = () => {
    setQuestionIndex((prevState) => prevState + 1)
    setButtonText('Check')
    setSelected('')
  }
  // CHECK ANSWER FUNCTION
  const handleCheckAnswer = () => {
    setLoading(true)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* <Fade cascade damping={0.1} className={styles.fade}> */}
          {/* QUESTION BOX */}
          <div className={styles.questionBox}>
            <span>
              Question {questionIndex + 1}/{question?.length}
            </span>
            <span className="languageText">{currentQuestion?.title}</span>
          </div>

          {/* ANNSWERS */}
          <div className={styles.answerWrap}>
            {currentQuestion?.options?.map((item: any) => (
              <div
                className={selected === item.id ? styles.answerBoxActive : styles.answerBox}
                key={item.id}
                onClick={() => selectAnswer(item.id)}
              >
                <span className="languageText">{item.title}</span>
              </div>
            ))}
          </div>
          <div className={styles.btnWrap}>
            <Button
              handleClick={() => (buttonText === 'Next' ? nextQuestion() : handleCheckAnswer())}
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
          {/* </Fade> */}
        </div>
      </div>
      {questionIndex + 1 > question?.length ? (
        <CorrectAnswerModal closeModal={setQuestionsPopup} />
      ) : null}
    </>
  )
}

export default VideoLessonQuestion
