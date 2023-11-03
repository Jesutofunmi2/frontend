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
  // const { trigger: sendAnswer, data, isMutating } = useCheckAnswer();
  // const { trigger: sendAnsweredQuestion } = useAnsweredQuestion();
  const studentID = useSelector(userData).currentUser?.data.student_id
  const [selected, setSelected] = useState('')
  // const studentID = useSelector((state) => state?.user?.currentUser?.data?.student_id);
  const [buttonColor, setButtonColor] = useState("grey" )
  const [isCorrect, setCorrect] = useState(false)
  // const gameData = useSelector((state) => state?.lessonGame?.data);

  const currentQuestion = question[questionIndex]
  // console.log(studentID)
  // CORRECT AND WRONG ANSWER CONDITION
  useEffect(() => {
    if (buttonColor === 'black') {
      const fetchAnswer = async () => {
        if (buttonColor === 'black') {
          let res = await checkAnswer({
            question_id: currentQuestion?.id,
            optionIds: [`${selected}`],
          })
          if (res.is_correct) {
            setButtonColor('green')
            // const audio = new Audio('@/public/assets/audios/yay.mp3')
            // audio.play()
            // const timer = setTimeout(() => {
            //   setButtonColor('Next')
            // }, 1700)
            // return () => clearTimeout(timer)
          } else {
            setButtonColor('red')
            // const audio = new Audio('@/public/assets/audios/notCorrect.mp3')
            // audio.play()
            // setButtonColor('red')
            // const timer = setTimeout(() => {
            //   setButtonColor('')
            // }, 1700)
            // return () => clearTimeout(timer)
            // setQuestionIndex((prev:any) => prev + 1);
          }

          // answeredQuestion({
          //   question_id: currentQuestion?.id,
          //   topic_id: topicID,
          //   student_id: studentID,
          // })
          // console.log(res)
          // setButtonColor('green')
          // setQuestionIndex((prev:any) => prev + 1);
          // setButtonColor("");
          // setSelected('')
        } else {
          // checkAnswer({
          //   question_id: currentQuestion?.id,
          //   optionIds: [`${selected}`],
          // })
          // setButtonColor('')
        }
        setSelected('grey')
      }
      // setButtonColor('')
      fetchAnswer()
    } else {
      setButtonColor("grey" )
    }
    //   // if data?.data?.is_correct is false
    //   if (buttonColor === 'red') {
    //     // Update the button color to red
    //     // setButtonColor("red");

    //     // play wrongAnswerSound audio
    //     const audio = new Audio('/public/assets/audios/notCorrect.mp3')
    //     audio.play()
    //     // Create a timer to reset the button color after 1700 milliseconds
    //     const timer = setTimeout(() => {
    //       setButtonColor('')
    //     }, 1700)

    //     // Clean up the timer when the component unmounts or when the dependency changes
    //     return () => clearTimeout(timer)

    //     // If data?.data?.is_correct is true
    //   } else if (buttonColor === 'green') {
    //     // Update the button color to green
    //     setButtonColor('green')

    //     // setSelected();

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
  }, [])

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
  console.log(buttonColor)
  // CHECK ANSWER FUNCTION
  const handleCheckAnswer = async () => {
    setButtonColor('black')
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
          <button
            style={{ backgroundColor: buttonColor}}
            className="w-48 p-4 h-20"
            onClick={() => handleCheckAnswer()}
          >
            {buttonColor === 'red'
                ? 'Wrong'
                : buttonColor === 'green'
                ? 'Correct'
                : buttonColor === 'black'
                ? 'Next'
                : 'Check'}
            {}
          </button>
          {/* // handleClick={() => handleCheckAnswer()}
            backgroundColor={buttonColor}
            text={
              buttonColor === 'red'
                ? 'Wrong'
                : buttonColor === 'green'
                ? 'Correct'
                : buttonColor === 'black'
                ? 'Next'
                : 'Check'
            }
            // disabled={!selected ? true : false || buttonColor === 'green' || buttonColor === 'red'}
            // disabled={!selected ? true : false || buttonColor === 'green' || buttonColor === 'red'}
          /> */}
        </div>
      </div>
      {questionIndex + 1 > question?.length ? <CorrectAnswerModal /> : null}
    </>
  )
}

export default LessonGameTwo
