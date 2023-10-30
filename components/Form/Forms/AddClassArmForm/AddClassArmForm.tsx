import React, { useState } from "react";
import styles from "./addClassArmForm.module.css";
import TextInput from "../../FormFields/TextInput/TextInput";
import Button from "@/components/Button/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Select from "../../FormFields/Select/Select";
import { useGetLanguages } from "@/services/api/languages";
import { useAddClass, useAddClassArm } from "@/services/api/school/class";
import { useSelector } from "react-redux";
import { AiOutlinePlusCircle, AiOutlineCloseCircle } from "react-icons/ai";

const AddClassArmForm = ({ armOpenwithID, setArmOpenWithID, mutate }) => {
  const IDs = useSelector((state) => state?.user?.currentSchool?.data);
  const [classArms, setClassArms] = useState([{ name: "" }]);
  const { data: language } = useGetLanguages();
  const [payloadData, setPayloadData] = useState({
    school_id: `${IDs?.id}`,
    class_id: 10,
    language_id: "",
    data: [],
  });

  const { trigger: addClassArm } = useAddClassArm(payloadData, mutate);

  console.log(armOpenwithID);

  // SUBMIT FORM CONDITION
  const handleSubmit = (e) => {
    e.preventDefault();
    addClassArm({
      school_id: `${IDs?.id}`,
      class_id: armOpenwithID.classID,
      language_id: armOpenwithID.languageID,
      data: classArms,
    });
    setArmOpenWithID(false)
  };

  // Options for Select component
  const options = language?.data?.map((item) => {
    return { value: item?.id, label: item?.name };
  });

  // HANDLE CHANGE FOR ARMS
  const handleChange = (e, index) => {
    const { value } = e.target;
    const list = [...classArms];
    list[index]["name"] = value;
    setClassArms(list);
  };

  // HANDLE ADD ARMS
  const handleAddClassArm = () => {
    setClassArms((current) => [...current, { name: "" }]);
  };

  // HANDLE REMOVE ARMS
  const handleRemoveClassArm = (index) => {
    console.log(index);
    const list = [...classArms];
    list.splice(index, 1);
    setClassArms(list);
  };

  return (
    <>
      <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
        <h3 className={styles.title}>Add class arm</h3>
        <hr />

        {classArms.map((item, index) => (
          <div className={styles.inputWrap} key={index}>
            {/* <TextInput
              defaultValue={classDetails?.first_name}
              title="Class arm"
              name="class_room_name"
              handleChange={handleChange}
              type="text"
            /> */}

            <div>
              <span>Class arm name</span>
              <input
                onChange={(e) => handleChange(e, index)}
                className={styles.input}
                required
                value={item.name}
              />
            </div>

            {classArms?.length > 1 ? (
              <AiOutlineCloseCircle
                size={25}
                className={styles.closIcon}
                onClick={() => handleRemoveClassArm?.(index)}
              />
            ) : null}
          </div>
        ))}
        <p className={styles.addWrap} onClick={() => handleAddClassArm()}>
          <span>Add more</span> <AiOutlinePlusCircle size={25} />
        </p>

        <div className={styles.btnWrap}>
          <Button maxWidth="150px" text="Save" />
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddClassArmForm;
