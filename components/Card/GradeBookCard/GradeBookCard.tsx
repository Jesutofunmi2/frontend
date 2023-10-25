import React from "react";
import styles from "./gradeBookCard.module.css";
import Image from "next/image";

const GradeBookCard = () => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.greenBox}>
          <p>Points</p>
          <p>100.0</p>
        </div>
        <div className={styles.cardTextWrap}>
          <span className={styles.text}>
            <h4 className={styles.bigText}>Name</h4>{" "}
            <span className={styles.smallText}>John</span>
          </span>
          <span className={styles.text}>
            <h4 className={styles.bigText}>Roll No</h4>{" "}
            <span className={styles.smallText}>9783</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default GradeBookCard;
