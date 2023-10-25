import React from "react";
import styles from "./assignQuizCard.module.css"

const AssignQuizCard = ({item, handleSelectQuiz}) => {
  return (
    <>
      <div className={styles.card}>
        <input
          type="checkbox"
          className={styles.checkBox}
          onChange={(e) => handleSelectQuiz(e, item)}
        />
        <p>{item.title}</p>
      </div>
    </>
  );
};

export default AssignQuizCard;
