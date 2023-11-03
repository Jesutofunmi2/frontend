'use client'

import React, { useEffect, useState } from 'react'
import styles from './lessonGameThree.module.css'
import { AiFillHeart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { pickAnswer, removeAnswer } from '@/services/redux/features/lessonGameSlice'
import Image from 'next/image'
import { answeredQuestion, checkAnswer } from '@/services/api/lessonGame'
// import wrongAnswerSound from "@/public/assets/audios/notCorrect.mp3";
// import clickSound from "@/public/assets/audios/click.mp3";
// import correctAnswerSound from "/public/assets/audios/yay.mp3";
import OptionButton from './OptionButton/OptionButton'
import { Fade } from 'react-awesome-reveal'
import Button from '@/components/Button/Button'
import CorrectAnswerModal from '@/components/Modal/CorrectAnswerModal/CorrectAnswerModal'
import { useSearchParams } from 'next/navigation'
import { userData } from '@/services/redux/features/userSlice'
import { LessonQuestion, Options } from '@/types/lessontopic'

interface LessonGameProps {
  question: LessonQuestion[]
  questionIndex: number
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>
  setCurrentQtn: React.Dispatch<React.SetStateAction<LessonQuestion | undefined>>
  topicID: number
}
const LessonGameOne = ({
  question,
  questionIndex,
  setQuestionIndex,
  setCurrentQtn,
  topicID,
}: LessonGameProps) => {
  // const dispatch = useDispatch();
  // const studentID = useSelector(
  //   (state) => state?.user?.currentUser?.data?.student_id
  // );
  const studentID = Number(useSelector(userData).currentUser?.data?.student_id!)
  const searchParams = useSearchParams()
  // const { trigger: sendAnswer, data, isMutating } = checkAnswer();
  // const { trigger: sendAnsweredQuestion } = useAnsweredQuestion();
  const [selectedAnswer, setSelectedAnswer] = useState<number>()
  const [answers, setAnswers] = useState([])
  const [puzzle, setPuzzle] = useState<Options[]>([])
  const type = searchParams.get('type')
  const [buttonColor, setButtonColor] = useState('')

  const currentQuestion = question[questionIndex]

  // // CORRECT AND WRONG ANSWER CONDITION
  // useEffect(() => {
  //   // **** IF data?.data?.is_correct IS FALSE **** //
  //   if (data?.data?.is_correct === false) {
  //     // Update the button color to red
  //     setButtonColor('red')

  //     // play wrongAnswerSound audio
  //     const audio = new Audio('@/public/assets/audios/notCorrect.mp3')
  //     audio.play()

  //     // Create a timer to reset the button color after 1700 milliseconds
  //     const timer = setTimeout(() => {
  //       setButtonColor('')
  //     }, 1000)

  //     // Clean up the timer when the component unmounts or when the dependency changes
  //     return () => clearTimeout(timer)

  //     // **** IF data?.data?.is_correct IS TRUE **** //
  //   } else if (data?.data?.is_correct === true) {
  //     // Update the button color to green
  //     setButtonColor('green')

  //     // play correctAnswerSound audio
  //     const audio = new Audio('/public/assets/audios/yay.mp3')
  //     audio.play()

  //     // Create a timer to reset the button color after 1700 milliseconds
  //     const timer = setTimeout(() => {
  //       setButtonColor('yellowgreen')
  //     }, 1700)

  //     // Clean up the timer when the component unmounts or when the dependency changes
  //     return () => clearTimeout(timer)
  //   }
  // }, [data, setQuestionIndex])

  useEffect(() => {
    setCurrentQtn(currentQuestion)
    setPuzzle(currentQuestion?.options)
  }, [setCurrentQtn, currentQuestion])

  // SELECT ANSWER FUNCTION
  const selectAnswer = (id: number) => {
    setSelectedAnswer(id)
    const audio = new Audio('/public/assets/audios/click.mp3')
    audio.play()
  }

  // CHECK ANSWER FUNCTION
  const handlecheckAnswer = () => {
    if (buttonColor === 'yellowgreen') {
      answeredQuestion({
        question_id: currentQuestion?.id,
        topic_id: topicID,
        student_id: studentID,
      })
      setQuestionIndex((prev: number) => prev + 1)
      setButtonColor('')
      setSelectedAnswer(0)
    } else {
      checkAnswer({
        question_id: currentQuestion?.id,
        optionIds: [`${selectedAnswer}`],
      })
    }
  }

  const handlePlayAudio = () => {
    const audio = new Audio(currentQuestion?.media_url)
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
            <h3>{currentQuestion?.title}</h3>
          </div>

          {/* SPEAKER */}
          <div className={styles.speakerWrap}>
            <Image src={currentQuestion?.image_url} height={250} width={250} alt="image" />
            <Image
              src="/assets/images/speaker.png"
              height="50"
              width={50}
              alt="speaker"
              onClick={() => handlePlayAudio()}
              className={styles.playIcon}
            />
          </div>

          <hr />

          {/* PICK ANSWER BOX */}
          <Fade cascade damping={0.1} style={{ width: '100%' }} duration={1300} direction="up">
            <ul className={styles.pickAnswerWrap}>
              {puzzle?.map((option: any) => {
                let chosenAnswer = selectedAnswer === option.id ? 'orange' : '#E1E1E1'
                return (
                  <OptionButton
                    backgroundColor={`${chosenAnswer}`}
                    text={option.title}
                    key={option.id}
                    handleClick={selectAnswer}
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
                handleClick={handlecheckAnswer}
                backgroundColor={`${buttonColor}`}
                text={
                  buttonColor === 'red'
                    ? 'Wrong'
                    : buttonColor === 'green'
                    ? 'Correct'
                    : buttonColor === 'yellowgreen'
                    ? 'Next'
                    : 'Check'
                }
             
                // disabled={
                //   !selectedAnswer
                //     ? true
                //     : false || isMutating || buttonColor === 'green' || buttonColor === 'red'
                // }
              />
            </div>
          </Fade>
        </div>
      </div>
      {questionIndex + 1 > question?.length ? <CorrectAnswerModal /> : null}
    </>
  )
}

export default LessonGameOne
