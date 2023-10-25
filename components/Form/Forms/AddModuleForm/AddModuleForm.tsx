import React, { useState, useEffect } from "react";
import styles from "./addModuleForm.module.css";
import Button from "@/components/Button/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Date from "../../FormFields/Date/date";

const AddModuleForm = ({ handleClick, file }) => {
  const [formdata, setFormdata] = useState({
    date: "",
    time: 0,
    no_attempt: 0,
    mark: 0,
    file: {},
  });

  // HANDLE INPUT FIELDS
  const handleChange = (e) => {
    const data = { ...formdata };
    data[e.target.name] = e.target.value;
    setFormdata(data);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    handleClick(formdata);
    setFormdata({
      date: "",
      time: 0,
      no_attempt: 0,
      mark: 0,
      file: {},
    });
  };

  return (
    <>
      <form className={styles.container} onSubmit={(e) => handleAdd(e)}>
        {/* <h3 className={styles.title}>Assign Module</h3> */}
        <hr />

        <div className={styles.inputWrap}>
          {/* Date */}
          <div className={styles.attemptWrap}>
            <div className={styles.titleWrap}>
              <h3>Date</h3>
            </div>
            <Date
              handleChange={handleChange}
              name="date"
              value={formdata.deadline}
            />
          </div>
          {/* Time */}
          <div className={styles.attemptWrap}>
            <div className={styles.titleWrap}>
              <h3>Time</h3>
            </div>
            <>
              <input
                type="number"
                name="time"
                // value={formdata.time}
                id=""
                placeholder="Minutes"
                className={styles.Input}
                onChange={(e) => handleChange(e)}
                required
              />
            </>
          </div>
          {/* Attempt */}
          <>
            <input
              type="number"
              name="no_attempt"
              // value={formdata.no_attempt}
              id=""
              placeholder="No. of Attempts"
              className={styles.Input}
              onChange={(e) => handleChange(e)}
              required
            />
          </>
          {/* Mark */}
          <>
            <input
              type="number"
              // value={formdata.mark}
              name="mark"
              id=""
              placeholder="Mark"
              className={styles.Input}
              onChange={(e) => handleChange(e)}
              required
            />
          </>

          {file ?<div>
            <input type="file" name="file" id="" onChange={(e) => handleChange(e)} required/>
          </div>: null}
        </div>

        <div className={styles.btn}>
        <Button text="Add" width="200px" />
        </div>
       
      </form>

      <ToastContainer />
    </>
  );
};

export default AddModuleForm;
