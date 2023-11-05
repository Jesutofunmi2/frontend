"use client";

import React, { useEffect, useState } from "react";
import styles from "./videoLessonQuestion.module.css";
import { Fade } from "react-awesome-reveal";
import Button from "../Button/Button";
import { checkAnswer } from "@/services/api/lessonGame";
import wrongAnswerSound from "@/public/assets/audios/notCorrect.mp3";
import clickSound from "@/public/assets/audios/click.mp3";
import correctAnswerSound from "@/public/assets/audios/yay.mp3";
import CorrectAnswerModal from "../Modal/CorrectAnswerModal/CorrectAnswerModal";
import { LessonQuestion, QuestionOptions } from "@/types/lessontopic";


interface VideoLessonQuestionProps{
  question:LessonQuestion[], 
    questionIndex:number, 
  setQuestionIndex:React.Dispatch<React.SetStateAction<number>>,
  setQuestionsPopup:React.Dispatch<React.SetStateAction<boolean>>
}
const VideoLessonQuestion = ({ question, questionIndex, setQuestionIndex, setQuestionsPopup }:VideoLessonQuestionProps) => {
  const [selected, setSelected] = useState("");
  const [closeModal, setCloseModal] = useState(true);

  // const { trigger: sendAnswer, data, isMutating } = useCheckAnswer();
  const [answers, setAnswers] = useState([]);
  const [puzzle, setPuzzle] = useState<QuestionOptions[]>([]);
  const [buttonColor, setButtonColor] = useState("");
  const [buttonText, setButtonText] = useState('Check')
  const currentQuestion = question[questionIndex];
  const [isLoading, setLoading] = useState(false)

  // console.log(question);

  // // CORRECT AND WRONG ANSWER CONDITION
  useEffect(() => {
    const currentQuestion = question[questionIndex];
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
    // // **** IF data?.data?.is_correct IS FALSE **** //
    // if (data?.data?.is_correct === false) {
    //   // Update the button color to red
    //   setButtonColor("red");

    //   // play wrongAnswerSound audio
    //   const audio = new Audio("@/public/assets/audios/notCorrect.mp3");
    //   audio.play();

    //   // Create a timer to reset the button color after 1700 milliseconds
    //   const timer = setTimeout(() => {
    //     setButtonColor("");
    //   }, 1000);

    //   // Clean up the timer when the component unmounts or when the dependency changes
    //   return () => clearTimeout(timer);

    //   // **** IF data?.data?.is_correct IS TRUE **** //
    // } else if (data?.data?.is_correct === true) {
    //   // Update the button color to green
    //   setButtonColor("green");

    //   // play correctAnswerSound audio
    //   const audio = new Audio("@/public/assets/audios/yay.mp3");
    //   audio.play();

    //   // Create a timer to reset the button color after 1700 milliseconds
    //   const timer = setTimeout(() => {
    //     setButtonColor("yellowgreen");
    //   }, 1700);

    //   // Clean up the timer when the component unmounts or when the dependency changes
    //   return () => clearTimeout(timer);
    // }
  }, [isLoading, questionIndex, currentQuestion])

  // FUNCTION TO AUTO-PLAY QUESTION WHEN YOU LAND ON PAGE AND WHEN YOU MOVE TO NEXT QUESTION
  useEffect(() => {
    setPuzzle(currentQuestion?.options);
  }, [currentQuestion]);

  // SELECT ANSWER FUNCTION
  const selectAnswer = (id:string) => {
    setSelected(id);
    const audio = new Audio(clickSound);
    audio.play();
  };

  // CHECK ANSWER FUNCTION
  const handleCheckAnswer = () => {
    if (buttonColor === "yellowgreen") {
      setQuestionIndex((prev) => prev + 1);
      setButtonColor("");
      setSelected("");
    } else {
     checkAnswer({
        question_id: currentQuestion?.id,
        optionIds: [`${selected}`],
      });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Fade cascade damping={0.1} className={styles.fade}>
            {/* QUESTION BOX */}
            <div className={styles.questionBox}>
              <span>
                Question {questionIndex + 1}/{question?.length}
              </span>
              <span className="languageText">{currentQuestion?.title}</span>
            </div>

            {/* ANNSWERS */}
            <div className={styles.answerWrap}>
              {currentQuestion?.options?.map((item:any) => (
                <div
                  className={
                    selected ===(item.id)
                      ? styles.answerBoxActive
                      : styles.answerBox
                  }
                  key={item.id}
                  onClick={() => selectAnswer(item.id)}
                >
                  <span className="languageText">{item.title}</span>
                </div>
              ))}
            </div>
            <div className={styles.btnWrap}>
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
                disabled={!selected || buttonText === 'Correct' || buttonText === 'Wrong'}
              />
            </div>
          </Fade>
        </div>
      </div>
      {questionIndex + 1 > question?.length ? <CorrectAnswerModal closeModal={setQuestionsPopup}/> : null}
    </>
  );
};

export default VideoLessonQuestion;
