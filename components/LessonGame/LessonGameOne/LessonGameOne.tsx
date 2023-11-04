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
  // const studentID = Number(useSelector(userData).currentUser?.data?.student_id!)

  const [answers, setAnswers] = useState<string[] | any>([])
  const [puzzle, setPuzzle] = useState<string[]>([])
  const [isLoading, setLoading] = useState(false)
  const [selected, setSelected] = useState('')
  const [buttonText, setButtonText] = useState('Check')

  // // CORRECT AND WRONG ANSWER CONDITION
  useEffect(() => {
    setCurrentQtn(question[questionIndex])
    if(!puzzle?.length){
      setPuzzle(currentQtn?.options[0].title)
    }
    if (isLoading) {
      const fetchAnswer = async () => {
        let res = await checkAnswer({
          question_id: currentQtn?.id,
          optionIds: [`${selected}`],
          puzzle_text: answers,
        })
        console.log(res)
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
    } else {
    }
    setLoading(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, questionIndex, currentQtn])

 
 
  const nextQuestion = () => {
    setQuestionIndex((prevState) => prevState + 1)
    
    setCurrentQtn(question[questionIndex])
    setPuzzle(currentQtn?.options[0].title)
    setButtonText('Check')
    setSelected('')
  }
  // FUNCTION TO AUTO-PLAY QUESTION WHEN YOU LAND ON PAGE AND WHEN YOU MOVE TO NEXT QUESTION
  // useEffect(() => {
  //   setCurrentQtn(currentQtn);
  //   setPuzzle(currentQtn?.options[0]?.title);
  //   // setList(draggableList)
  // }, [setCurrentQtn, currentQtn]);

  // CHECK ANSWER FUNCTION
  const handleCheckAnswer = () => {
    setLoading(true)
    setSelected(currentQtn.options[0].id)
  }

  const handlePickAnswer = (opt: string) => {
    setAnswers([...answers, opt])
    setPuzzle((current) => current.filter((fruit) => fruit !== opt))
    const audio = new Audio(clickSound)
    audio.play()
  }

  const handleRemoveAnswer = (opt: string) => {
    const audio = new Audio(clickSound)
    audio.play()
    setPuzzle((current) => [...current, opt])
    setAnswers((current: string[]) => current.filter((fruit) => fruit !== opt))
  }

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
              {answers?.map((item: string) => (
                <div
                  className={styles.showAnswer}
                  key={item}
                  onClick={() => handleRemoveAnswer(item)}
                >
                  {item}
                </div>
              ))}
            </ReactSortable>
          </div>

          <hr />

          {/* PICK ANSWER BOX */}
          {/* <div className={styles.pickAnswerWrap}>
            {currentQtn?.options?.map((option) => (
              <div
                key={option.id}
                
              >
               <div className='flex gap-5 items-center my-6 justify-center'>
               {option.title.map((ele, index) => {
                  return (
                    <button onClick={() => handlePickAnswer(ele)}  key={index} className={styles.answer} >
                      {ele}
                    </button>
                  )
                })}
               </div>
               
              </div>
            ))}
          </div> */}
          <div className={styles.pickAnswerWrap}>
            {puzzle?.map((option) => (
              <div className={styles.answer} key={option} onClick={() => handlePickAnswer(option)}>
                <p className="languageText">{option}</p>
              </div>
            ))}
          </div>

          <Button
            handleClick={handleCheckAnswer}
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
            disabled={!answers.length || buttonText === 'Correct' || buttonText === 'Wrong'}
          />
        </div>
      </div>
    </>
  )
}

export default LessonGameOne
