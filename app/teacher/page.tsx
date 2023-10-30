"use client";

import React from "react";
import styles from "./page.module.css";
import SelectImage from "@/components/SelectImage/SelectImage";
import TextInput from "@/components/Form/FormFields/TextInput/TextInput";

import { useSelector } from "react-redux";

const TeacherProfile = () => {
  const teacherData = useSelector((state) => state?.user?.currentTeacher?.data);

  console.log(teacherData);
  // HANDLE INPUT FIELDS
  const handleChange = (e) => {
    const data = { ...payloadData };
    data[e.target.name] = e.target.value;
    setPayloadData(data);
  };

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>Profile</h3>
        <div>
          <div className={styles.imageWrap}>
            <SelectImage />
          </div>

          <div className={styles.details}>
            <TextInput
              title="Name"
              defaultValue={teacherData?.name}
              handleChange={handleChange}
              readOnly={true}
            />
            <TextInput
              title="Email"
              defaultValue={teacherData?.email}
              handleChange={handleChange}
              readOnly={true}
            />
          </div>
          <hr />
          <div className={styles.btnWrap}>
            {/* <Button text="Edit" maxWidth="200px" width="100%"/> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherProfile;
