'use client'

import React, { useEffect, useState } from 'react'
import styles from './lessonGameOne.module.css'
import { AiFillHeart } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { pickAnswer, removeAnswer } from '@/services/redux/features/lessonGameSlice'
import Image from 'next/image'
import Button from '@/components/Button/Button'
import { BsFillPlayFill } from 'react-icons/bs'
import { ReactSortable } from 'react-sortablejs'
import { answeredQuestion, checkAnswer } from '@/services/api/lessonGame'
import { userData } from '@/services/redux/features/userSlice'
import { LessonQuestion } from '@/types/lessontopic'
import wrongAnswerSound from '@/public/assets/audios/notCorrect.mp3'
import clickSound from '@/public/assets/audios/click.mp3'
import correctAnswerSound from '@/public/assets/audios/yay.mp3'

const draggableList = [
  {
    name: 'Mike',
  },
  {
    name: 'Michael',
  },
  {
    name: 'Mason',
  },
  {
    name: 'Miller',
  },
]

interface LessonGameOneProps {
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
}: LessonGameOneProps) => {
  const studentID = Number(useSelector(userData).currentUser?.data?.student_id!)
  const [selectedAnswer, setSelectedAnswer] = useState<number>()
  const [openCorrectModal, setOpenCorrectModal] = useState(false)
  const [answers, setAnswers] = useState([])
  const [puzzle, setPuzzle] = useState([])
  const [buttonColor, setButtonColor] = useState('')
  const [list, setList] = useState([])
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
            // nextQuestion()
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

  // FUNCTION TO AUTO-PLAY QUESTION WHEN YOU LAND ON PAGE AND WHEN YOU MOVE TO NEXT QUESTION
  // useEffect(() => {
  //   setCurrentQtn(currentQtn);
  //   // setPuzzle(currentQuestion?.options[0]?.title);
  //   // setList(draggableList)
  // }, [setCurrentQtn, currentQtn]);

  // CHECK ANSWER FUNCTION
  const handleCheckAnswer = () => {
    if (buttonColor === 'yellowgreen') {
      answeredQuestion({
        question_id: currentQtn?.id,
        topic_id: topicID,
        student_id: studentID,
      })
      setQuestionIndex((prev) => prev + 1)
      setButtonColor('')
      setAnswers([])
      // setSelected("");
    } else {
      checkAnswer({
        question_id: currentQtn?.id,
        optionIds: [`${currentQtn?.options[0]?.id}`],
        puzzle_text: answers,
      })
    }
  }

  // const handlePickAnswer = (opt) => {
  //   setAnswers((current) => [...current, opt]);

  //   setPuzzle((current) => current.filter((fruit) => fruit !== opt));

  //   const audio = new Audio("/public/assets/audios/click.mp3");
  //   audio.play();
  //   // dispatch(pickAnswer(opt))
  // };

  // const handleRemoveAnswer = (opt:any) => {
  //   if (!isMutating) {
  //   setAnswers((current) => current.filter((fruit) => fruit !== opt));
  //   }

  //   setPuzzle((current) => [...current, opt]);
  //   // dispatch(removeAnswer(opt))
  // };

  const handlePlayAudio = () => {
    // play wrongAnswerSound audio
    const audio = new Audio(currentQtn.options[0]?.media_url)
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

          {/* IMAGE AND SPEAKER */}
          <div className={styles.imgAndSpeaker}>
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
            <div className={styles.speakerWrap}>
              <Image src="/assets/images/speaker.png" height="30" width={50} alt="speaker" />
              <BsFillPlayFill
                color="#28B8F8"
                onClick={() => handlePlayAudio()}
                className={styles.playIcon}
              />
            </div>
          </div>

          {/* SHOW ANSWER BOX */}
          <div className={styles.answersWrap}>
            <ReactSortable
              filter=".addImageButtonContainer"
              dragClass="sortableDrag"
              list={answers}
              setList={setAnswers}
              // animation={100}
              easing="ease-out"
              className={styles.answersWrap}
            >
              {answers?.map((item) => (
                <div
                  className={styles.showAnswer}
                  key={item}
                  // onClick={() => handleRemoveAnswer(item)}
                >
                  {item}
                </div>
              ))}
            </ReactSortable>
          </div>

          <hr />

          {/* PICK ANSWER BOX */}
          <div className={styles.pickAnswerWrap}>
            {puzzle?.map((option) => (
              <div
                className={styles.answer}
                key={option}
                // onClick={() => handlePickAnswer(option)}
              >
                <p className="languageText">{option}</p>
              </div>
            ))}
          </div>

          <Button
            handleClick={handleCheckAnswer}
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
            disabled={
              answers?.length === 0
                ? true
                : false || buttonColor === 'green' || buttonColor === 'red'
            }
          />
        </div>
      </div>
    </>
  )
}

export default LessonGameOne
