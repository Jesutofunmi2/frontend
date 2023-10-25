import React, { useState, useEffect } from "react";
import styles from "./addFileForm.module.css";
import Button from "@/components/Button/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Date from "../../FormFields/Date/date";

const AddFileForm = ({ handleClick, file }) => {
  const [formdata, setFormdata] = useState({
    date: "",
    topic: "",
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

  // HANDLE FILE CHANGE
  const handleFile = (e) => {
    setFormdata({ ...formdata, file: e.target.files[0]});
  };

  const handleAdd = (e) => {
    console.log(formdata);
    e.preventDefault();
    handleClick(formdata);
    // setFormdata({
    //   date: "",
    //   topic: 0,
    //   no_attempt: 0,
    //   mark: 0,
    //   file: {},
    // });
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
              value={formdata.date}
            />
          </div>
          {/* Time */}
          <div className={styles.attemptWrap}>
            <div className={styles.titleWrap}>
              <h3>Topic</h3>
            </div>
            <>
              <input
                type="text"
                name="topic"
                // value={formdata.time}
                id=""
                placeholder="Enter topic"
                className={styles.Input}
                onChange={(e) => handleChange(e)}
                required
              />
            </>
          </div>
          {/* Attempt */}

          <div>
            <input
              type="file"
              name="file"
              id=""
              onChange={(e) => handleFile(e)}
              required
            />
          </div>

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
        </div>

        <div className={styles.btn}>
          <Button text="Add" width="200px" />
        </div>
      </form>

      <ToastContainer />
    </>
  );
};

export default AddFileForm;
