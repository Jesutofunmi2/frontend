import React, { useState, useEffect } from "react";
import styles from "./assignmentForm.module.css";
import Button from "@/components/Button/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Date from "../../FormFields/Date/date";

const AssignmentForm = ({
  payloadData,
  setPayloadData,
  handleSubmit,
  selectModule,
  selectQuiz,
}) => {
  const [attemptOpen, setattemptOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  // HANDLE INPUT FIELDS
  const handleChange = (e) => {
    const data = { ...payloadData };
    data[e.target.name] = e.target.value;
    setPayloadData(data);
  };

  // GENDER SELECT OPTIONS
  const genderOptions = ["Male", "Female"];

  // COUNTRY SELECT OPTIONS
  const countryOptions = ["Nigeria"];

  return (
    <>
      <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
        {/* <h3 className={styles.title}>Assign Module</h3> */}
        <hr />

        <div className={styles.inputWrap}>
          {/* Topic */}
          <div className={styles.attemptWrap}>
            <div className={styles.titleWrap}>
              <h3>Topic</h3>
            </div>
            <>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Topic"
                className={styles.Input}
              />
            </>
          </div>

          {/* Date */}
          <div className={styles.attemptWrap}>
            <div className={styles.titleWrap}>
              <h3>Date</h3>
            </div>
            <Date />
          </div>

          {/* Points */}
          <div className={styles.attemptWrap}>
            <div className={styles.titleWrap}>
              <h3>Points</h3>
            </div>
            <select name="" id="" className={styles.selectAttempt}>
              <option value="">Points</option>
              <option value="">30</option>
              <option value="">50</option>
            </select>
          </div>

          {/* File */}
          <div className={styles.attemptWrap}>
            <div className={styles.titleWrap}>
              <h3>File</h3>
            </div>
            <input type="file" />
          </div>

          {/* Notification */}
          <div className={styles.attemptWrap}>
            <div className={styles.titleWrap}>
              <input
                type="checkbox"
                name=""
                id=""
                className={styles.attemptRadio}
                // onChange={(e) => setTimeOpen(e.target.checked)}
              />
              <h4>Notification</h4>
            </div>
          </div>

          <div className={styles.btnWrap}>
          <Button maxWidth="150px" text="Save" title="Add" />
        </div>
        </div>
      </form>

      <ToastContainer />
    </>
  );
};

export default AssignmentForm;
