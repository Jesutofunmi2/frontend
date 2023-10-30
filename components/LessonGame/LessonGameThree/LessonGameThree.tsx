"use client";

import React, { useEffect, useState } from "react";
import styles from "./lessonGameThree.module.css";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  pickAnswer,
  removeAnswer,
} from "@/services/redux/features/lessonGameSlice";
import Image from "next/image";
import {
  useAnsweredQuestion,
  useCheckAnswer,
} from "@/services/api/lessonGame";
// import wrongAnswerSound from "@/public/assets/audios/notCorrect.mp3";
// import clickSound from "@/public/assets/audios/click.mp3";
// import correctAnswerSound from "/public/assets/audios/yay.mp3";
import OptionButton from "./OptionButton/OptionButton";
import { Fade } from "react-awesome-reveal";
import Button from "@/components/Button/Button";
import CorrectAnswerModal from "@/components/Modal/CorrectAnswerModal/CorrectAnswerModal";
import { useSearchParams } from "next/navigation";

const LessonGameOne = ({
  question,
  QuestionIndex,
  setQuestionIndex,
  setCurrentQtn,
  topicID,
}) => {
  const dispatch = useDispatch();
  const studentID = useSelector(
    (state) => state?.user?.currentUser?.data?.student_id
  );
  const searchParams = useSearchParams();
  const { trigger: sendAnswer, data, isMutating } = useCheckAnswer();
  const { trigger: sendAnsweredQuestion } = useAnsweredQuestion();
  const [selected, setSelected] = useState();
  const [answers, setAnswers] = useState([]);
  const [puzzle, setPuzzle] = useState([]);
  const type = searchParams.get("type");
  const [buttonColor, setButtonColor] = useState("");

  const currentQestion = question?.data[QuestionIndex];

  console.log(QuestionIndex);

  // // CORRECT AND WRONG ANSWER CONDITION
  useEffect(() => {
    // **** IF data?.data?.is_correct IS FALSE **** //
    if (data?.data?.is_correct === false) {
      // Update the button color to red
      setButtonColor("red");

      // play wrongAnswerSound audio
      const audio = new Audio("@/public/assets/audios/notCorrect.mp3");
      audio.play();

      // Create a timer to reset the button color after 1700 milliseconds
      const timer = setTimeout(() => {
        setButtonColor("");
      }, 1000);

      // Clean up the timer when the component unmounts or when the dependency changes
      return () => clearTimeout(timer);

      // **** IF data?.data?.is_correct IS TRUE **** //
    } else if (data?.data?.is_correct === true) {
      // Update the button color to green
      setButtonColor("green");

      // play correctAnswerSound audio
      const audio = new Audio("/public/assets/audios/yay.mp3");
      audio.play();

      // Create a timer to reset the button color after 1700 milliseconds
      const timer = setTimeout(() => {
        setButtonColor("yellowgreen");
      }, 1700);

      // Clean up the timer when the component unmounts or when the dependency changes
      return () => clearTimeout(timer);
    }
  }, [data, setQuestionIndex]);

  useEffect(() => {
    setCurrentQtn(currentQestion);
    setPuzzle(currentQestion?.options);
  }, [setCurrentQtn, currentQestion]);

  // SELECT ANSWER FUNCTION
  const selectAnswer = (id) => {
    setSelected(id);
    const audio = new Audio("/public/assets/audios/click.mp3");
    audio.play();
  };

  // CHECK ANSWER FUNCTION
  const checkAnswer = () => {
    if (buttonColor === "yellowgreen") {
      sendAnsweredQuestion({
        question_id: currentQestion?.id,
        topic_id: topicID,
        student_id: studentID,
      });
      setQuestionIndex((prev) => prev + 1);
      setButtonColor("");
      setSelected();
    } else {
      sendAnswer({
        question_id: currentQestion?.id,
        optionIds: [`${selected}`],
      });
    }
  };

  const handlePlayAudio = (opt) => {
    const audio = new Audio(currentQestion?.media_url);
    audio.play();
  };

  return (
    <>
      <div className={styles.lessonContainer}>
        <div className={styles.wrapper}>
          {/* HEADING TEXT */}
          <div className={styles.textWrap}>
            <h2>Translate this sentence</h2>
            <h3>Question No. {QuestionIndex + 1}</h3>
            <h3>{currentQestion?.title}</h3>
          </div>

          {/* SPEAKER */}
          <div className={styles.speakerWrap}>
            <Image
              src={""||currentQestion?.image_url}
              height={250}
              width={250}
              alt="image"
            />
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
          <Fade
            cascade
            damping={0.1}
            style={{ width: "100%" }}
            duration={1300}
            direction="up"
          >
            <ul className={styles.pickAnswerWrap}>
              {puzzle?.map((option) => {
                let chosenAnswer =
                  selected === option.id ? "orange" : "#E1E1E1";
                return (
                  <OptionButton
                    backgroundColor={`${chosenAnswer}`}
                    text={option.title}
                    key={option.id}
                    handleClick={selectAnswer}
                    id={option.id}
                  />
                );
              })}
            </ul>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "7px",
              }}
            >
              <Button
                handleClick={checkAnswer}
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
                disabled={
                  !selected
                    ? true
                    : false ||
                      isMutating ||
                      buttonColor === "green" ||
                      buttonColor === "red"
                }
              />
            </div>
          </Fade>
        </div>
      </div>
      {QuestionIndex + 1 > question?.data?.length ? (
        <CorrectAnswerModal />
      ) : null}
    </>
  );
};

export default LessonGameOne;
