"use client";

import React, { useEffect, useState } from "react";
import styles from "./videoLessonQuestion.module.css";
import { Fade } from "react-awesome-reveal";
import Button from "../Button/Button";
import { checkAnswer } from "@/services/api/lessonGame";
// import wrongAnswerSound from "@/public/assets/audios/notCorrect.mp3";
// import clickSound from "@/public/assets/audios/click.mp3";
// import correctAnswerSound from "@/public/assets/audios/yay.mp3";
import CorrectAnswerModal from "../Modal/CorrectAnswerModal/CorrectAnswerModal";
import { LessonQuestion, Options } from "@/types/lessontopic";


interface VideoLessonQuestionProps{
  question:LessonQuestion[], 
    questionIndex:number, 
  setQuestionIndex:React.Dispatch<React.SetStateAction<number>>,
  setQuestionsPopup:any
}
const VideoLessonQuestion = ({ question, questionIndex, setQuestionIndex, setQuestionsPopup }:VideoLessonQuestionProps) => {
  const [selected, setSelected] = useState<Number>();
  const [closeModal, setCloseModal] = useState(true);

  // const { trigger: sendAnswer, data, isMutating } = useCheckAnswer();
  const [answers, setAnswers] = useState([]);
  const [puzzle, setPuzzle] = useState<Options[]>([]);
  const [buttonColor, setButtonColor] = useState("");

  const currentQuestion = question[questionIndex];

  // console.log(question);

  // // CORRECT AND WRONG ANSWER CONDITION
  // useEffect(() => {
  //   // **** IF data?.data?.is_correct IS FALSE **** //
  //   if (data?.data?.is_correct === false) {
  //     // Update the button color to red
  //     setButtonColor("red");

  //     // play wrongAnswerSound audio
  //     const audio = new Audio("@/public/assets/audios/notCorrect.mp3");
  //     audio.play();

  //     // Create a timer to reset the button color after 1700 milliseconds
  //     const timer = setTimeout(() => {
  //       setButtonColor("");
  //     }, 1000);

  //     // Clean up the timer when the component unmounts or when the dependency changes
  //     return () => clearTimeout(timer);

  //     // **** IF data?.data?.is_correct IS TRUE **** //
  //   } else if (data?.data?.is_correct === true) {
  //     // Update the button color to green
  //     setButtonColor("green");

  //     // play correctAnswerSound audio
  //     const audio = new Audio("@/public/assets/audios/yay.mp3");
  //     audio.play();

  //     // Create a timer to reset the button color after 1700 milliseconds
  //     const timer = setTimeout(() => {
  //       setButtonColor("yellowgreen");
  //     }, 1700);

  //     // Clean up the timer when the component unmounts or when the dependency changes
  //     return () => clearTimeout(timer);
  //   }
  // }, [data]);

  // FUNCTION TO AUTO-PLAY QUESTION WHEN YOU LAND ON PAGE AND WHEN YOU MOVE TO NEXT QUESTION
  useEffect(() => {
    setPuzzle(currentQuestion?.options);
  }, [currentQuestion]);

  // SELECT ANSWER FUNCTION
  const selectAnswer = (id:number) => {
    setSelected(id);
    // const audio = new Audio(clickSound);
    // audio.play();
  };

  // CHECK ANSWER FUNCTION
  const handleCheckAnswer = () => {
    if (buttonColor === "yellowgreen") {
      setQuestionIndex((prev) => prev + 1);
      setButtonColor("");
      setSelected(0);
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
                    selected === Number(item.id)
                      ? styles.answerBoxActive
                      : styles.answerBox
                  }
                  key={item.id}
                  onClick={() => selectAnswer(Number(item.id))}
                >
                  <span className="languageText">{item.title}</span>
                </div>
              ))}
            </div>
            <div className={styles.btnWrap}>
              <Button
                handleClick={handleCheckAnswer}
                backgroundColor={`${buttonColor}`}
                text={
                  buttonColor === "red"
                    ? "Wrong"
                    : buttonColor === "green"
                    ? "Correct"
                    : buttonColor === "yellowgreen"
                    ? "Next"
                    : "Check"
                }
                maxWidth="230px"
                height="50px"
                // disabled={!selected ? true : false || isMutating || buttonColor === "green" || buttonColor === "red"}
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
