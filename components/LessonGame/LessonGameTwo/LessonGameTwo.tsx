'use client'

import React, { useEffect, useState } from 'react'
import styles from './lessonGameTwo.module.css'
import Button from '@/components/Button/Button'
import FlashCard from '../FlashCard/FlashCard'
import { Fade } from 'react-awesome-reveal'
import { answeredQuestion, checkAnswer } from '@/services/api/lessonGame'
// import wrongAnswerSound from "@/public/assets/audios/notCorrect.mp3";
// import correctAnswerSound from "@/public/assets/audios/yay.mp3";
import { useSelector } from 'react-redux'
import CorrectAnswerModal from '@/components/Modal/CorrectAnswerModal/CorrectAnswerModal'
import { userData } from '@/services/redux/features/userSlice'
import { LessonQuestion, QuestionOptions } from '@/types/lessontopic'
import { Spinner } from '@/components/Loader/Loader'

interface LessonGameTwoProps {
  question: LessonQuestion[]
  questionIndex: number
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>
  setCurrentQtn: React.Dispatch<React.SetStateAction<LessonQuestion | undefined>>
  topicID: string
}
const LessonGameTwo = ({
  question,
  questionIndex,
  setQuestionIndex,
  setCurrentQtn,
  topicID,
}: LessonGameTwoProps) => {
  const studentID = useSelector(userData).currentUser?.data.student_id
  const [selected, setSelected] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(question[questionIndex])
  const [buttonText, setButtonText] = useState('Check')
  // const [isCorrect, setCorrect] = useState(false)
  const [isLoading, setLoading] = useState(false)
  // const gameData = useSelector((state) => state?.lessonGame?.data);

  // const currentQuestion = question[questionIndex]
  console.log(currentQuestion)
  // CORRECT AND WRONG ANSWER CONDITION
  // useEffect(() => {
  //   // if (buttonColor === 'yellow') {
  //     const fetchAnswer = async () => {
  //       if (buttonColor === 'yellow') {
  //         let res = await checkAnswer({
  //           question_id: currentQuestion?.id,
  //           optionIds: [`${selected}`],
  //         })
  //         if (res.is_correct) {
  //            setButtonText('green')
  //           // const audio = new Audio('@/public/assets/audios/yay.mp3')
  //           // audio.play()
  //           // const timer = setTimeout(() => {
  //           //    setButtonText('Next')
  //           // }, 1700)
  //           // return () => clearTimeout(timer)
  //         } else {
  //            setButtonText('red')
  //           // const audio = new Audio('@/public/assets/audios/notCorrect.mp3')
  //           // audio.play()
  //           //  setButtonText('red')
  //           // const timer = setTimeout(() => {
  //           //    setButtonText('')
  //           // }, 1700)
  //           // return () => clearTimeout(timer)
  //           // setQuestionIndex((prev:any) => prev + 1);
  //         }

  //         // answeredQuestion({
  //         //   question_id: currentQuestion?.id,
  //         //   topic_id: topicID,
  //         //   student_id: studentID,
  //         // })
  //         // console.log(res)
  //         //  setButtonText('green')
  //         // setQuestionIndex((prev:any) => prev + 1);
  //         //  setButtonText("");
  //         // setSelected('')
  //       } else {
  //         // checkAnswer({
  //         //   question_id: currentQuestion?.id,
  //         //   optionIds: [`${selected}`],
  //         // })
  //         //  setButtonText('')
  //       }
  //       // setSelected('yellow')
  //     }
  //     //  setButtonText('')
  //     fetchAnswer()

  //   //   // if data?.data?.is_correct is false
  //   //   if (buttonColor === 'red') {
  //   //     // Update the button color to red
  //   //     //  setButtonText("red");

  //   //     // play wrongAnswerSound audio
  //   //     const audio = new Audio('/public/assets/audios/notCorrect.mp3')
  //   //     audio.play()
  //   //     // Create a timer to reset the button color after 1700 milliseconds
  //   //     const timer = setTimeout(() => {
  //   //        setButtonText('')
  //   //     }, 1700)

  //   //     // Clean up the timer when the component unmounts or when the dependency changes
  //   //     return () => clearTimeout(timer)

  //   //     // If data?.data?.is_correct is true
  //   //   } else if (buttonColor === 'green') {
  //   //     // Update the button color to green
  //   //      setButtonText('green')

  //   //     // setSelected();

  //   //     // play correctAnswerSound audio
  //   //     const audio = new Audio('/public/assets/audios/yay.mp3')
  //   //     audio.play()

  //   //     // Create a timer to reset the button color after 1700 milliseconds
  //   //     const timer = setTimeout(() => {
  //   //        setButtonText('yellowgreen')
  //   //     }, 1700)

  //   //     // Clean up the timer when the component unmounts or when the dependency changes
  //   //     return () => clearTimeout(timer)
  //   //   }
  // }, [buttonColor])

  // // FUNCTION TO AUTO-PLAY QUESTION WHEN YOU LAND ON PAGE AND WHEN YOU MOVE TO NEXT QUESTION
  // useEffect(() => {
  //   setCurrentQtn(currentQuestion)
  //   // const audio = new Audio(currentQestion?.media_url);
  //   // const aud = audio.play();
  //   // if (aud !== undefined) {
  //   //   aud
  //   //     .then((_) => {
  //   //       // autoplay starts!
  //   //     })
  //   //     .catch((error) => {
  //   //       //show error
  //   //     });
  //   // }
  // }, [setCurrentQtn, currentQuestion])

  useEffect(() => {
    if (isLoading) {
      const fetchAnswer = async () => {
        let res = await checkAnswer({
          question_id: currentQuestion?.id,
          optionIds: [`${selected}`],
        })
        if (res.is_correct) {
          setButtonText('Correct')
          const audio = new Audio('@/public/assets/audios/yay.mp3')
          audio.play()
          const timer = setTimeout(() => {
            setButtonText('Next')
          }, 1700)
          nextQuestion()

          return () => clearTimeout(timer)
        } else {
          setButtonText('Wrong')
          const audio = new Audio('/public/assets/audios/notCorrect.mp3')
          audio.play()
          const timer = setTimeout(() => {
            setButtonText('Check')
          }, 1700)
          return () => clearTimeout(timer)
        }
      }
      fetchAnswer()
    }
    setLoading(false)
  }, [isLoading])

  const nextQuestion = () => {
    setQuestionIndex((prevState) => prevState + 1)
    setCurrentQuestion(question[questionIndex])
  }

  // CHECK ANSWER FUNCTION
  const handleCheckAnswer = async () => {
    setLoading(true)
  }
  // console.log(currentQuestion)
  return (
    <>
      <div className={styles.LGTwoContainer}>
        <div className={styles.wrapper}>
          {/* HEADING TEXT */}
          <div className={styles.textWrap}>
            <h3>Question No. {questionIndex + 1}</h3>
          </div>

          <div className={styles.questionWrap}>
            <h3>{currentQuestion?.title}</h3>
            <div className={styles.flashcardWrap}>
              {/* <Fade
                cascade
                damping={0.1}
                style={{ maxWidth: "180px", width: "100%" }}
                duration={1500}
                direction="right"
              > */}
              {currentQuestion?.options?.map((option: QuestionOptions) => (
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
      {questionIndex + 1 > question?.length ? <CorrectAnswerModal /> : null}
    </>
  )
}

export default LessonGameTwo
