import React from "react";
import tutor from "/public/assets/images/tutor.png";
import Image from "next/image";
import styles from "./bookTutor.module.css";

const BookTutor = () => {
  return (
    <div className={styles.BTContainer}>
      <div className={styles.imgWrap}>
        <Image src={tutor} className={styles.img} alt="tutor"/>
      </div>

      <p>
        We understand that learning a language can be quite tasking, and to this
        effect, we have provided our users access to online tutors who would
        assist in their learning journey.
      </p>
    </div>
  );
};

export default BookTutor;
