import React, { useState } from "react";
import styles from "./addEditStudents.module.css";
import TextInput from "../../FormFields/TextInput/TextInput";
import Button from "@/components/Button/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "../../FormFields/Select/Select";
import Select2 from "../../FormFields/Select/select2";
import { IStudent } from "@/types";
import { IClass } from "@/types/class";

interface AddEditStudentsProps {
 
  payloadData:any,
  // setPayloadData,
  handleSubmit:(e: any)=>void,
  studentDetails:any,
  title:string,
  data:any,
  classOptions:any,
  setSelectedOptionForClass:any,
  classArmoptions:IClass[],
  selectedOptionForClass:any,
  setSelectedOptionForClassArm:any,
  selectedOptionForClassArm:any,
}
const AddEditStudents = ({
  payloadData,
  // setPayloadData,
  handleSubmit,
  studentDetails,
  title,
  data,
  classOptions,
  setSelectedOptionForClass,
  classArmoptions,
  selectedOptionForClass,
  setSelectedOptionForClassArm,
  selectedOptionForClassArm,
}:AddEditStudentsProps) => {
  // HANDLE INPUT FIELDS
  const handleChange = (e:any) => {
    const data = { ...payloadData };
    data[e.target.name] = e.target.value;
    // setPayloadData(data);
  };

  // GENDER SELECT OPTIONS
  const genderOptions = ["Male", "Female"];

  // COUNTRY SELECT OPTIONS
  const sessionOptions = ["2023/2024"];

  return (
    <>
      <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
        <h3 className={styles.title}>{title}</h3>
        <hr />

        <div className={styles.inputWrap}>
          <TextInput
            defaultValue={studentDetails?.first_name}
            title="First name"
            name="first_name"
            handleChange={(e)=>handleChange(e)}
            type="text"
            placeholder="Enter name"
          />
          <TextInput
            title="Last Name"
            name="last_name"
            handleChange={handleChange}
            type="text"
            defaultValue={studentDetails?.last_name}
            placeholder="Last name"
          />
          <TextInput
            defaultValue={studentDetails?.language}
            title="Language"
            name="language"
            handleChange={handleChange}
            type="text"
            placeholder="Enter language"
          />
          <TextInput
            title="Age"
            name="age"
            handleChange={handleChange}
            defaultValue={studentDetails?.age}
            type="number"
            placeholder="Enter age (number)"
          />
          <Select
            name="gendar"
            title="Gender"
            option={genderOptions}
            handleChange={handleChange}
            defaultValue={studentDetails?.gendar}
          />
          <TextInput
            title="Term"
            name="term"
            handleChange={handleChange}
            type="text"
            defaultValue={studentDetails?.term}
            placeholder="Enter school term"
          />

          <Select
            name="session"
            title="Session"
            option={sessionOptions}
            handleChange={handleChange}
            defaultValue={studentDetails?.gendar}
          />
          <Select2
            title="Class"
            classOptions={classOptions}
            setSelectedOption={setSelectedOptionForClass}
            value={selectedOptionForClass?.classs_room_name}
          />

          {selectedOptionForClass ? (
            <div className={styles.selectWrap}>
              <span>Class Arm</span>
              <select
                name="classarm_id"
                className={styles.select}
                onChange={(e) => handleChange(e)}
                required
              >
                <option value="">Select</option>
                {classArmoptions?.map((item:any) => (
                  <option value={item.value} key={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
        <div className={styles.btnWrap}>
          <Button maxWidth="150px" text="Save" />
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddEditStudents;
