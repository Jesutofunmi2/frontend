"use client"

import React from "react";
import styles from "./page.module.css";
import SelectImage from "@/components/SelectImage/SelectImage";
import TextInput from "@/components/Form/FormFields/TextInput/TextInput";
import Button from "@/components/Button/Button";


const EditProfile = () => {

   // HANDLE INPUT FIELDS
   const handleChange = (e) => {
    // const data = { ...payloadData };
    // data[e.target.name] = e.target.value;
    // setPayloadData(data);
  };

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>Edit Profile</h3>
        <div>
          <div className={styles.imageWrap}>
            <SelectImage />
          </div>

          <div className={styles.details}>
            <TextInput title="School Name" handleChange={handleChange} />
            <TextInput title="Principal Name" handleChange={handleChange} />
            <TextInput title="Username" handleChange={handleChange} />
            <TextInput title="Email" handleChange={handleChange} />
            <TextInput title="Phone" handleChange={handleChange} />
          </div>
          <hr />
          <div className={styles.btnWrap}>
            <Button text="Save" maxWidth="200px" width="100%" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
