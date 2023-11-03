"use client";

import React, { useEffect, useState } from "react";
import styles from "./classLessonGameTwo.module.css";
import Button from "@/components/Button/Button";
import FlashCard from "../FlashCard/FlashCard";
import { Fade } from "react-awesome-reveal";
import { useAnsweredQuestion, useCheckAnswer } from "@/services/APIs/lessonGame";
import wrongAnswerSound from "@/public/assets/audios/notCorrect.mp3";
import correctAnswerSound from "@/public/assets/audios/yay.mp3";
import { useSelector } from "react-redux";
import CorrectAnswerModal from "@/components/Modal/CorrectAnswerModal/CorrectAnswerModal";
import { BsFillPlayFill } from "react-icons/bs";

const ClassLessonGameTwo = ({
  question,
  QuestionIndex,
  setQuestionIndex,
  setCurrentQtn,
  topicID
}) => {
  const { trigger: sendAnswer, data, isMutating } = useCheckAnswer();
  const { trigger: sendAnsweredQuestion} = useAnsweredQuestion();
  const [selected, setSelected] = useState();
  const studentID = useSelector((state) => state?.user?.currentUser?.data?.student_id);
  const [buttonColor, setButtonColor] = useState("");

  const currentQestion = question?.data[QuestionIndex];

  // CORRECT AND WRONG ANSWER CONDITION
  useEffect(() => {
    // if data?.data?.is_correct is false
    if (data?.data?.is_correct === false) {
      // Update the button color to red
      setButtonColor("red");

      // play wrongAnswerSound audio
      const audio = new Audio(wrongAnswerSound);
      audio.play();
      // Create a timer to reset the button color after 1700 milliseconds
      const timer = setTimeout(() => {
        setButtonColor("");
      }, 1700);

      // Clean up the timer when the component unmounts or when the dependency changes
      return () => clearTimeout(timer);

      // If data?.data?.is_correct is true
    } else if (data?.data?.is_correct === true) {
      // Update the button color to green
      setButtonColor("green");

      // setSelected();

      // play correctAnswerSound audio
      const audio = new Audio(correctAnswerSound);
      audio.play();

      // Create a timer to reset the button color after 1700 milliseconds
      const timer = setTimeout(() => {
        setButtonColor("yellowgreen");
      }, 1700);

      // Clean up the timer when the component unmounts or when the dependency changes
      return () => clearTimeout(timer);
    }
  }, [data, setQuestionIndex]);

  // FUNCTION TO AUTO-PLAY QUESTION WHEN YOU LAND ON PAGE AND WHEN YOU MOVE TO NEXT QUESTION
  useEffect(() => {
    setCurrentQtn(currentQestion);
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
  }, [setCurrentQtn, currentQestion]);


  // CHECK ANSWER FUNCTION
  const checkAnswer = () => {
    if (buttonColor === "yellowgreen") {
      sendAnsweredQuestion({
        question_id: currentQestion?.id,
        topic_id: topicID,
        student_id: studentID,
      });
      setQuestionIndex((prev) => prev + 1)
      setButtonColor("")
      setSelected()
    } else{
      sendAnswer({
        question_id: currentQestion?.id,
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
            <h3>Question No. {QuestionIndex + 1}</h3>
          </div>

           {/* IMAGE AND SPEAKER */}
           <div className={styles.imgAndSpeaker}>
            <div className={styles.speakerWrap}>
              {/* <Image
                src="/assets/images/speaker.png"
                height="30"
                width={50}
                alt="speaker"
              /> */}
              <BsFillPlayFill
                color="#28B8F8"
                onClick={() => handlePlayAudio()}
                className={styles.playIcon}
              />
            </div>
          </div>

          <div className={styles.questionWrap}>
            <h3>{currentQestion?.title}</h3>
            <div className={styles.flashcardWrap}>
              <Fade
                cascade
                damping={0.1}
                style={{ maxWidth: "180px", width: "100%" }}
                duration={1500}
                direction="right"
              >
                {currentQestion?.options?.map((option) => (
                  <FlashCard
                    setSelected={setSelected}
                    selected={selected}
                    option={option}
                    key={option.id}
                    noTitle={true}
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
              handleClick={checkAnswer}
              backgroundColor={`${buttonColor}`}
              text={
                buttonColor === "red"
                  ? "Wrong"
                  : buttonColor === "green"
                  ? "Correct" : buttonColor === "yellowgreen" ? "Next"
                  : "Check"
              }
       
              disabled={!selected ? true : false || isMutating || buttonColor === "green" || buttonColor === "red"}
            />
          {/* )} */}
        </div>
      </div>
      {QuestionIndex + 1 > question?.data?.length ? <CorrectAnswerModal/> : null}
    </>
  );
};

export default ClassLessonGameTwo;
