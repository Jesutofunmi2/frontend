"use client";

import React, { useEffect, useState } from "react";
import styles from "./lessonGameOne.module.css";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  pickAnswer,
  removeAnswer,
} from "@/services/redux/features/lessonGameSlice";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { BsFillPlayFill } from "react-icons/bs";
import { ReactSortable } from "react-sortablejs";
import { useAnsweredQuestion, useCheckAnswer } from "@/services/api/lessonGame";
// import wrongAnswerSound from "@/public/assets/audios/notCorrect.mp3";
// import clickSound from "@/public/assets/audios/click.mp3";
import correctAnswerSound from "@/public/assets/audios/yay.mp3";

const draggableList = [
  {
    name: "Mike",
  },
  {
    name: "Michael",
  },
  {
    name: "Mason",
  },
  {
    name: "Miller",
  },
];

const LessonGameOne = ({
  question,
  QuestionIndex,
  setQuestionIndex,
  setCurrentQtn,
  topicID
}) => {
  
  const dispatch = useDispatch();
  const studentID = useSelector((state) => state?.user?.currentUser?.data?.student_id);
  const { trigger: sendAnswer, data, isMutating } = useCheckAnswer();
  const { trigger: sendAnsweredQuestion} = useAnsweredQuestion();
  const [selected, setSelected] = useState();
  const [openCorrectModal, setOpenCorrectModal] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [puzzle, setPuzzle] = useState([]);
  const [buttonColor, setButtonColor] = useState("");
  const [list, setList] = useState([]);

  const currentQestion = question?.data[QuestionIndex];

  console.log(list)

  // // CORRECT AND WRONG ANSWER CONDITION
  useEffect(() => {
    // if data?.data?.is_correct is false
    if (data?.data?.is_correct === false) {
      // Update the button color to red
      setButtonColor("red");

      // play wrongAnswerSound audio
      const audio = new Audio("/public/assets/audios/notCorrect.mp3");
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

      // play correctAnswerSound audio
      const audio = new Audio("/public/assets/audios/yay.mp3");
      audio.play();

      // move to next question by updating the question index
      // setQuestionIndex((prev) => prev + 1);
      setOpenCorrectModal(true);
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
    setPuzzle(currentQestion?.options[0]?.title);
    setList(draggableList)
  }, [setCurrentQtn, currentQestion]);

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
      setAnswers([]);
      setSelected();
    } else {
      sendAnswer({
        question_id: currentQestion?.id,
        optionIds: [`${currentQestion?.options[0]?.id}`],
        puzzle_text: answers,
      });
    }
  };

  const handlePickAnswer = (opt) => {
    setAnswers((current) => [...current, opt]);

    setPuzzle((current) => current.filter((fruit) => fruit !== opt));

    const audio = new Audio("/public/assets/audios/click.mp3");
    audio.play();
    // dispatch(pickAnswer(opt))
  };

  const handleRemoveAnswer = (opt) => {
    if (!isMutating) {
    setAnswers((current) => current.filter((fruit) => fruit !== opt));
    }

    setPuzzle((current) => [...current, opt]);
    // dispatch(removeAnswer(opt))
  };

  const handlePlayAudio = (opt) => {
    // play wrongAnswerSound audio
    const audio = new Audio(currentQestion?.options[0]?.media_url);
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

          {/* IMAGE AND SPEAKER */}
          <div className={styles.imgAndSpeaker}>
            {/* <Image src={currentQestion?.image_url} className={styles.img} alt="character" width={280} height={280}/> */}
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

          {/* SHOW ANSWER BOX */}
          <div className={styles.answersWrap}>
            <ReactSortable
              filter=".addImageButtonContainer"
              dragClass="sortableDrag"
              list={answers}
              setList={setAnswers}
              animation="100"
              easing="ease-out"
              className={styles.answersWrap}
            >
              {answers?.map((item) => (
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
          <div className={styles.pickAnswerWrap}>
            {puzzle?.map((option) => (
              <div
                className={styles.answer}
                key={option}
                onClick={() => handlePickAnswer(option)}
              >
                 <p className="languageText">{option}</p>
              </div>
            ))}
          </div>

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
            maxWidth="200px"
            disabled={answers?.length === 0 ? true : false || isMutating || buttonColor === "green" || buttonColor === "red"}
          />
        </div>
      </div>
    </>
  );
};

export default LessonGameOne;
