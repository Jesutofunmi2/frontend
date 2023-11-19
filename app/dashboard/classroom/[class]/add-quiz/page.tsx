"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { GrAttachment } from "react-icons/gr";
import BackNavigation from "@/components/BackNavigation/BackNavigation";
import Button from "@/components/Button/Button";
import AddClassworkForm from "@/components/Form/Forms/Assignment/AddModuleForm/AddModuleForm";
import Modal from "@/components/Modal/Modal";
import AssignCard from "@/components/Card/AssignCard/AssignCard";
import { Spinner } from "@/components/Loader/Loader";
import AssignQuizCard from "@/components/Card/AssignQuizCard/AssignQuizCard";
import ModulesSection from "@/components/Sections/ModulesSection/ModulesSection";
import AddModuleForm from "@/components/Form/Forms/Assignment/AddModuleForm/AddModuleForm";

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

const AddQuizPage = () => {
  const [selectModule, setselectModule] = useState([]);
  const [selectQuiz, setselectQuiz] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [payloadData, setPayloadData] = useState({
    first_name: "",
    gendar: "",
  });

  // const handleClick = (param) => {
  //   // setModalOpen(true);
  //   setselectModule((current) => [...current, param]);
  // };

  const handleSelectQuiz = (e: { target: { checked: any; }; }, item: any) => {
    // setModalOpen(true);
    const chosen = e.target.checked;
    if (chosen) {
      // setselectQuiz((current) => [...current, item]);
    }
  };

  const handleModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div>
        <BackNavigation />
        <h3 className="headerTitle">Add Assignment</h3>

        <div className={styles.body}>
          <div>
            <p className={styles.selectModuleTitle}>SELECT MODULE</p>
            {/* <ModulesSection
              data={lessons}
              isValidating={isValidating}
              setselectModule={setselectModule}
              selectModule={selectModule}
            /> */}
          </div>

          {selectModule.length > 0 ? (
            <div>
              <p className={styles.selectModuleTitle}>SELECT QUIZ</p>
              <div className={styles.cardWrap}>
                {card?.map((item) => {
                  let selected = selectModule.find((e:any) => e.id === item.id);
                  return (
                    <AssignQuizCard
                      item={item}
                      key={item.id}
                      handleSelectQuiz={handleSelectQuiz}
                      // selected={selected}
                    />
                  );
                })}

                {/* {isValidating ? <Spinner /> : null} */}
              </div>
            </div>
          ) : null}

          {/* {selectQuiz.length > 0 ? <AddModuleForm /> : null} */}

          {selectQuiz.length > 0 ? (
            <Button text="Add" handleClick={handleModal} />
          ) : null}
        </div>
      </div>
      {/* MODAL TO MODIFY STUDENTS */}
      {/* <Modal open={modalOpen} setOpen={setModalOpen}>
        <AddClassworkForm
          // payloadData={payloadData}
          // setPayloadData={setPayloadData}
          // selectModule={selectModule}
          // selectQuiz={selectQuiz}
        />
      </Modal> */}
    </>
  );
};

export default AddQuizPage;
