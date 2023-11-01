import React from "react";
import styles from "./assignVideoCard.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import AssignCard from "../AssignCard/AssignCard";
import { BsFillPlayFill } from "react-icons/bs";
import { RiAttachment2 } from "react-icons/ri";

const AssignVideoCard = () => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.titleWrap}>
          <div className={styles.textWrap}>
            <BsFillPlayFill color="white" size={23} />
            <p>Module Assignment</p>
          </div>
          <AiOutlineDelete size={23} />
        </div>

        <div className={styles.detailWrap}>
          {/* <AssignCard /> */}
        </div>
        <hr className={styles.line} />
        <div className={styles.attachment}>
          <RiAttachment2 />
          <span>See Attachment</span>
        </div>
      </div>
    </>
  );
};

export default AssignVideoCard;
