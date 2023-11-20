import React, { useState } from "react";
import styles from "./assigmentSection.module.css";
import Button from "../../Button/Button";
import ClassworkCard from "../../Card/ClassworkCard/ClassworkCard";
import Modal from "../../Modal/Modal";
import AddClassWork from "../../Form/Forms/Assignment/AddModuleForm/AddModuleForm";
import { useRouter } from "next/router";
import Link from "next/link";
import AssignModuleCard from "../../Card/AssignModuleCard/AssignModuleCard";

const AssignmentSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [payloadData, setPayloadData] = useState({
    first_name: "",
    gendar: "",
  });

  // OPEN MODAL CONDITION
  // const handleModalOpen = (evt) => {
  //   switch (evt) {
  //     case true:
  //       setModalOpen(true);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <>
      <div className={styles.container}>
        <Link href="/teacher/class/i/add-assignment">
          <Button
            text="Add Assignment"
           
            // handleClick={() => handleModalOpen(true)}
          />
        </Link>

        <div className={styles.cardWrap}>
          {/* <AssignModuleCard />
          <AssignModuleCard /> */}
        </div>
      </div>
      {/* MODAL TO MODIFY STUDENTS */}
      {/* <Modal open={modalOpen} setOpen={setModalOpen}>
        <AddClassWork
          payloadData={payloadData}
          setPayloadData={setPayloadData}
        />
      </Modal> */}
    </>
  );
};

export default AssignmentSection;
