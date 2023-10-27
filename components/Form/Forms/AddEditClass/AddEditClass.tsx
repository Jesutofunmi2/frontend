import React, { useState } from "react";
import styles from "./addEditClass.module.css";
import TextInput from "../../FormFields/TextInput/TextInput";
import Button from "@/components/Button/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
// import Select from "../../FormFields/Select/Select";
import { useGetLanguages } from "@/services/old-apis/languages";
import { useAddClass } from "@/services/old-apis/class";
import { useSelector } from "react-redux";

const AddEditClass = ({ classDetails, title, mutate, setModalOpen }) => {
  const IDs = useSelector((state) => state?.user?.currentSchool?.data);
  const { data: language } = useGetLanguages();
  const [payloadData, setPayloadData] = useState({
    school_id: `${IDs?.id}`,
    language_id: "",
    class_room_name: "",
  });
  const { trigger: addClass } = useAddClass(payloadData, mutate);


  // SUBMIT FORM CONDITION
  const handleSubmit = (e) => {
    e.preventDefault();
    addClass(payloadData);
    setModalOpen(false)
  };

  // Options for Select component
  const options = language?.data?.map((item) => {
    return { value: item?.id, label: item?.name };
  });

  // HANDLE INPUT FIELDS
  const handleChange = (e) => {
    const data = { ...payloadData };
    data[e.target.name] = e.target.value;
    setPayloadData(data);
  };

  // Handle Select change
  const handlechange = (e) => {
    console.log(e.value)
    setPayloadData({...payloadData, language_id: e.value})
  };

  // Select component styles
  const colourStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: "#F19C00",
      height: "45px",
      borderRadius: "15px",
      width: "100%",
    }),
  };

  return (
    <>
      <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
        <h3 className={styles.title}>{title}</h3>
        <hr />

        <div className={styles.inputWrap}>
          <TextInput
            defaultValue={classDetails?.first_name}
            title="Class"
            name="class_room_name"
            handleChange={handleChange}
            type="text"
          />
          <div>
            <p className={styles.label}>Language</p>
            <Select
              options={options}
              onChange={handlechange}
              styles={colourStyles}
            />
          </div>
        </div>
        <div className={styles.btnWrap}>
          <Button maxWidth="150px" text="Save" />
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddEditClass;
