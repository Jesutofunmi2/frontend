'use client'

import React, { useEffect, useState } from 'react'
import styles from './lessonGameThree.module.css'
import { AiFillHeart } from 'react-icons/ai'
import { useSelector } from 'react-redux'
// import { pickAnswer, removeAnswer } from '@/services/redux/features/lessonGameSlice'
import Image from 'next/image'
import { answeredQuestion, checkAnswer } from '@/services/api/lessonGame'
import wrongAnswerSound from '@/public/assets/audios/notCorrect.mp3'
import clickSound from '@/public/assets/audios/click.mp3'
import correctAnswerSound from '/public/assets/audios/yay.mp3'
import OptionButton from './OptionButton/OptionButton'
import { Fade } from 'react-awesome-reveal'
import Button from '@/components/Button/Button'
import CorrectAnswerModal from '@/components/Modal/CorrectAnswerModal/CorrectAnswerModal'
import { useSearchParams } from 'next/navigation'
import { userData } from '@/services/redux/features/userSlice'
import { LessonQuestion, QuestionOptions } from '@/types/lessontopic'
import { Loader } from '@/components/Loader/Loader'

interface LessonGameProps {
  question: LessonQuestion[]
  questionIndex: number
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>
  setCurrentQtn: React.Dispatch<React.SetStateAction<LessonQuestion>>
  topicID: string
  currentQtn: LessonQuestion
}
const LessonGameOne = ({
  question,
  questionIndex,
  setQuestionIndex,
  setCurrentQtn,
  topicID,
  currentQtn,
}: LessonGameProps) => {
  // const studentID = Number(useSelector(userData).currentUser?.data?.student_id!)
  const searchParams = useSearchParams()
  // const [selectedAnswer, setSelectedAnswer] = useState<number>()
  // const [answers, setAnswers] = useState([])
  // const [puzzle, setPuzzle] = useState<QuestionOptions[]>([])
  const type = searchParams.get('type')
  const [isLoading, setLoading] = useState(false)
  const [selected, setSelected] = useState('')
  const [buttonText, setButtonText] = useState('Check')

  // // CORRECT AND WRONG ANSWER CONDITION
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

  // useEffect(() => {
  //   setCurrentQtn(currentQuestion)
  //   setPuzzle(currentQuestion?.options)
  // }, [setCurrentQtn, currentQuestion])

  if (!currentQtn || !currentQtn.options.length) return <Loader />
  // SELECT ANSWER FUNCTION
  // const selectAnswer = (id: number) => {
  //   // setSelectedAnswer(id)
  //   setButtonText('Check')
  //   const audio = new Audio(clickSound)
  //   audio.play()
  // }

  // CHECK ANSWER FUNCTION
  const handleCheckAnswer = () => {
    setLoading(true)
  }

  const handlePlayAudio = () => {
    const audio = new Audio(currentQtn?.media_url)
    audio.play()
  }

  return (
    <>
      <div className={styles.lessonContainer}>
        <div className={styles.wrapper}>
          {/* HEADING TEXT */}
          <div className={styles.textWrap}>
            <h2>Translate this sentence</h2>
            <h3>Question No. {questionIndex + 1}</h3>
            <h3>{currentQtn?.title}</h3>
          </div>

          {/* SPEAKER */}
          <div className={styles.speakerWrap}>
            {currentQtn?.options.map((option) => {
              return (
                <Image
                  key={option.id}
                  src={option.image_url}
                  height={150}
                  width={150}
                  alt="image"
                />
              )
            })}
            <Image
              src="/assets/images/speaker.png"
              height="20"
              width={50}
              alt="speaker"
              onClick={() => handlePlayAudio()}
              className={styles.playIcon}
            />
          </div>

          <hr />

          {/* PICK ANSWER BOX */}
          {/* <Fade cascade damping={0.1} style={{ width: '100%' }} duration={1300} direction="up"> */}
          <ul className={styles.pickAnswerWrap}>
            {currentQtn.options?.map((option: any) => {
              let chosenAnswer = selected === option.id ? 'orange' : '#E1E1E1'
              return (
                <OptionButton
                  backgroundColor={`${chosenAnswer}`}
                  text={option.title}
                  key={option.id}
                  handleClick={()=>setSelected(option.id)}
                  id={option.id}
                />
              )
            })}
          </ul>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '7px',
            }}
          >
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
          {/* </Fade> */}
        </div>
      </div>
      {/* {questionIndex + 1 > question?.length ? <CorrectAnswerModal /> : null} */}
    </>
  )
}

export default LessonGameOne
