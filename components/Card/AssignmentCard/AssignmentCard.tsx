import React from "react";
import styles from "./assignmentCard.module.css"
import { TiDocumentText } from "react-icons/ti";
import { AiOutlineDelete } from "react-icons/ai";
import { RiAttachment2 } from "react-icons/ri";

const AssignmentCard = () => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.titleWrap}>
          <div className={styles.textWrap}>
            <TiDocumentText color="white" size={23} />
            <p>food</p>
          </div>
          <AiOutlineDelete size={23} />
        </div>

        <div className={styles.detailWrap}>
          <div className={styles.detail}>
            <p>Deadline</p>
            <p>08/03/2023</p>
          </div>

          <div className={styles.detail}>
            <p>Points</p>
            <p>20</p>
          </div>


          <hr className={styles.line} />

          <div className={styles.attachmentWrap}>
            <div className={styles.attachment}>
                <RiAttachment2/>
                <span>See Attachment</span>
            </div>

            <span>Submissions</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignmentCard;
