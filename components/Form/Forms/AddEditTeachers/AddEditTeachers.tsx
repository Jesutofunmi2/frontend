import React, { useState } from "react";
import styles from "./addEditTeachers.module.css";
import TextInput from "../../FormFields/TextInput/TextInput";
import Button from "@/components/Button/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectImage from "@/components/SelectImage/SelectImage";

const AddEditTeachers = ({
  payloadData,
  setPayloadData,
  handleSubmit,
  teacherDetails,
  title,
  setFile
}) => {
  
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
        <h3 className={styles.title}>{title}</h3>
        <hr />
        <div className={styles.imageWrap}>
        <SelectImage name="image_url" setFile={setFile}/>
        </div>
        <div className={styles.inputWrap}>
          <TextInput
            defaultValue={teacherDetails?.name}
            title="Name"
            name="name"
            handleChange={handleChange}
          />
          <TextInput
            defaultValue={teacherDetails?.email}
            title="Email"
            name="email"
            type="email"
            handleChange={handleChange}
          />
        </div>
        <div className={styles.btnWrap}>
          <Button maxWidth="150px" text="Save" />
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddEditTeachers;
