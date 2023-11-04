"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { GrAttachment } from "react-icons/gr";
import BackNavigation from "@/components/BackNavigation/BackNavigation";
import Button from "@/components/Button/Button";
import { useGetLessons } from "@/services/api/lessons";
import AddClassworkForm from "@/components/Form/Forms/AddModuleForm/AddModuleForm";
import Modal from "@/components/Modal/Modal";
import AssignCard from "@/components/Card/AssignCard/AssignCard";
import { Spinner } from "@/components/Loader/Loader";
import AssignQuizCard from "@/components/Card/AssignQuizCard/AssignQuizCard";
import AddModuleForm from "@/components/Form/Forms/AddModuleForm/AddModuleForm";
import ModulesSection from "@/components/Sections/ModulesSection/ModulesSection";

const card = [
  { id: 1, title: "He/she is buying dog", lesson: "lesson No 1" },
  { id: 2, title: "He/she is buying cow", lesson: "lesson No 2" },
  { id: 3, title: "He/she is buying goat", lesson: "lesson No 3" },
  { id: 4, title: "He/she is buying okpa", lesson: "lesson No 4" },
  { id: 5, title: "He/she is buying egg", lesson: "lesson No 4" },
  { id: 6, title: "He/she is buying food", lesson: "lesson No 4" },
  { id: 7, title: "He/she is buying egg", lesson: "lesson No 4" },
  { id: 8, title: "He/she is buying food", lesson: "lesson No 4" },
];

const AssignModulePage = () => {
  const [selectModule, setselectModule] = useState([]);
  const [selectQuiz, setselectQuiz] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  // const { data, isValidating } = useGetLessons(languageID);
  const [payloadData, setPayloadData] = useState({
    first_name: "",
    gendar: "",
  });

  // const handleClick = (param) => {
  //   const alreadyExisting = selectModule.find((item) => item.id === param.id);
  //   if (alreadyExisting) {
  //     setselectModule((current) =>
  //       current.filter((fruit) => fruit.id !== param.id)
  //     );
  //   } else {
  //     setselectModule((current) => [...current, param]);
  //   }
  // };

  const handleModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div>
        <BackNavigation />
        <h3 className="headerTitle">Assign Module</h3>

        <div className={styles.body}>
          <div>
            <p className={styles.selectModuleTitle}>SELECT MODULE</p>
            {/* <ModulesSection
              selectModule={selectModule}
              setselectModule={setselectModule}
              data={data}
              isValidating={isValidating}
            /> */}
          </div>

          {/* <AddModuleForm /> */}

          <Button
          
            text="Create Module"
            handleClick={()=>handleModal}
          />
        </div>
      </div>
      {/* MODAL TO MODIFY STUDENTS */}
      {/* <Modal open={modalOpen} setOpen={setModalOpen}>
        <AddClassworkForm
          payloadData={payloadData}
          setPayloadData={setPayloadData}
          selectModule={selectModule}
          selectQuiz={selectQuiz}
        />
      </Modal> */}
    </>
  );
};

export default AssignModulePage;
