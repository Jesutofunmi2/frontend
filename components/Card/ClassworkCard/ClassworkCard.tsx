import React from "react";
import styles from "./classworkCard.module.css";
import { AiTwotoneDelete } from "react-icons/ai";
import { RiAttachment2 } from "react-icons/ri";
import Link from "next/link";

const ClassworkCard = ({ data, handleClick }) => {

  // HANDLE DELETE STUDENT
 
  return (
    <>
      <div className={styles.card}>
        <AiTwotoneDelete
          size={23}
          color="red"
          className={styles.icon}
          onClick={() => {
            window.confirm("Delete this class?") &&
              handleClick(data);
          }}
        />
        <div className={styles.wrap}>
          <div className={styles.studentCount}>
            <span>{data?.name}</span>
          </div>
          <Link
            href="/teacher/class/loo/classwork"
            className={styles.attachment}
          >
            <RiAttachment2 size={22} /> See Attachment
          </Link>
        </div>
      </div>
    </>
  );
};

export default ClassworkCard;
