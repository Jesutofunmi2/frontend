"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import ClassCard from "@/components/Card/ClassCard/ClassCard";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import AddEditClass from "@/components/Form/Forms/AddEditClass/AddEditClass";
import { useDeleteClass, useGetClasses } from "@/services/api/class";
import { useSelector } from "react-redux";
import { Loader } from "@/components/Loader/Loader";

const TeacherClass = () => {
  const [classDetails, setclassDetails] = useState(null);
  const IDs = useSelector((state) => state?.user?.currentTeacher?.data);
  const { data, isValidating , mutate} = useGetClasses(IDs.school?.id, IDs?.teacher_id);
  const { trigger } = useDeleteClass(IDs.school?.id, IDs?.teacher_id, mutate);
  const [modalOpen, setModalOpen] = useState(false);

  // OPEN MODAL CONDITION
  const handleModalOpen = (evt, data) => {
    switch (evt) {
      case "add":
        setModalOpen(true);
        setclassDetails(null);
        break;
      case "edit":
        setModalOpen(true);
        setclassDetails(data);
        break;
      default:
        break;
    }
  };

  const handleClassDelete = (param) => {
    trigger({
      className: param?.classs_room_name
    });
  };

  return (
    <>
      <div className={styles.dash}>
        <h3 className="headerTitle">Classes</h3>
        <div className={styles.btnWrap}>
          <Button
            text="Add Class"
            width="190px"
            handleClick={() => handleModalOpen("add", "")}
          />
        </div>

        <div className={styles.classWrap}>
          {data?.data?.map((item) => (
            <ClassCard
              key={item.id}
              data={item}
              url={`/teacher/class/classroom`}
              handleClick={handleClassDelete}
            />
          ))}
          {data?.data.length <= 0 ? "No Classwork" : null}
          {isValidating ? <Loader /> : null}
        </div>
      </div>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <AddEditClass
          title={classDetails ? "Edit Class" : "Add Class"}
          classDetails={classDetails}
          mutate={mutate}
        />
      </Modal>
    </>
  );
};

export default TeacherClass;
