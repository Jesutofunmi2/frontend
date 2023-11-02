"use client";

import React, { useEffect, useState } from "react";
import styles from "./lessonGameTwo.module.css";
import Button from "@/components/Button/Button";
import FlashCard from "../FlashCard/FlashCard";
import { Fade } from "react-awesome-reveal";
import {
  answeredQuestion,
  checkAnswer,
} from "@/services/api/lessonGame";
// import wrongAnswerSound from "@/public/assets/audios/notCorrect.mp3";
// import correctAnswerSound from "@/public/assets/audios/yay.mp3";
import { useSelector } from "react-redux";
import CorrectAnswerModal from "@/components/Modal/CorrectAnswerModal/CorrectAnswerModal";
import { userData } from "@/services/redux/features/userSlice";
import { LessonQuestion } from "@/types/lessontopic";

interface LessaonGameTwoProps{
  question:LessonQuestion[],
  questionIndex:number,
  setQuestionIndex:React.Dispatch<React.SetStateAction<number>>,
  setCurrentQtn:React.Dispatch<React.SetStateAction<LessonQuestion | undefined>>,
  topicID: number,
}
const LessonGameTwo = ({
  question,
  questionIndex,
  setQuestionIndex,
  setCurrentQtn,
  topicID,
}:LessaonGameTwoProps) => {
  // const { trigger: sendAnswer, data, isMutating } = useCheckAnswer();
  // const { trigger: sendAnsweredQuestion } = useAnsweredQuestion();
  const studentID = Number(useSelector(userData).currentUser?.data?.student_id!)
  const [selected, setSelected] = useState();
  // const studentID = useSelector((state) => state?.user?.currentUser?.data?.student_id);
  const [buttonColor, setButtonColor] = useState("");
  // const gameData = useSelector((state) => state?.lessonGame?.data);


  const currentQuestion = question[questionIndex];
  // CORRECT AND WRONG ANSWER CONDITION
  // useEffect(() => {
  //   // if data?.data?.is_correct is false
  //   if (data?.data?.is_correct === false) {
  //     // Update the button color to red
  //     setButtonColor("red");

  //     // play wrongAnswerSound audio
  //     const audio = new Audio("/public/assets/audios/notCorrect.mp3");
  //     audio.play();
  //     // Create a timer to reset the button color after 1700 milliseconds
  //     const timer = setTimeout(() => {
  //       setButtonColor("");
  //     }, 1700);

  //     // Clean up the timer when the component unmounts or when the dependency changes
  //     return () => clearTimeout(timer);

  //     // If data?.data?.is_correct is true
  //   } else if (data?.data?.is_correct === true) {
  //     // Update the button color to green
  //     setButtonColor("green");

  //     // setSelected();

  //     // play correctAnswerSound audio
  //     const audio = new Audio("/public/assets/audios/yay.mp3");
  //     audio.play();

  //     // Create a timer to reset the button color after 1700 milliseconds
  //     const timer = setTimeout(() => {
  //       setButtonColor("yellowgreen");
  //     }, 1700);

  //     // Clean up the timer when the component unmounts or when the dependency changes
  //     return () => clearTimeout(timer);
  //   }
  // }, [data, setQuestionIndex]);

  // FUNCTION TO AUTO-PLAY QUESTION WHEN YOU LAND ON PAGE AND WHEN YOU MOVE TO NEXT QUESTION
  useEffect(() => {
    setCurrentQtn(currentQuestion);
    // const audio = new Audio(currentQestion?.media_url);
    // const aud = audio.play();
    // if (aud !== undefined) {
    //   aud
    //     .then((_) => {
    //       // autoplay starts!
    //     })
    //     .catch((error) => {
    //       //show error
    //     });
    // }
  }, [setCurrentQtn, currentQuestion]);

  // CHECK ANSWER FUNCTION
  const handleCheckAnswer = () => {
    if (buttonColor === "yellowgreen") {
      answeredQuestion({
        question_id: currentQuestion?.id,
        topic_id: topicID,
        student_id: studentID,
      });
      setQuestionIndex((prev:any) => prev + 1);
      setButtonColor("");
      setSelected();
    } else {
      checkAnswer({
        question_id:currentQuestion?.id,
        optionIds: [`${selected}`],
      });
    }
  };

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
              <Fade
                cascade
                damping={0.1}
                style={{ maxWidth: "180px", width: "100%" }}
                duration={1500}
                direction="right"
              >
                {currentQuestion?.options?.map((option:any) => (
                  <FlashCard
                    setSelected={setSelected}
                    selected={selected}
                    option={option}
                    key={option.id}
                  />
                ))}
              </Fade>
            </div>
          </div>
          {/* {openCorrectModal ? (
            <button className={styles.nextBtn} onClick={() => handleNext()}>
              Next
              <HiOutlineArrowNarrowRight size={30} />
            </button>
          ) : ( */}
          <Button
            handleClick={ handleCheckAnswer}
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
            maxWidth="200px"
            disabled={
              !selected
                ? true
                : false ||
                  isMutating ||
                  buttonColor === "green" ||
                  buttonColor === "red"
            }
          />
          {/* )} */}
        </div>
      </div>
      {questionIndex + 1 > question?.length ? (
        <CorrectAnswerModal />
      ) : null}
    </>
  );
};

export default LessonGameTwo;
