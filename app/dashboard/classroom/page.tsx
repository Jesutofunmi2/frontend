"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import ClassCard from "@/components/Card/ClassCard/ClassCard";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import AddEditClass from "@/components/Form/Forms/AddEditClass/AddEditClass";
import { useGetClasses } from "@/services/api/school/class";
import { useSelector } from "react-redux";
import { Loader } from "@/components/Loader/Loader";
import { userData } from "@/services/redux/features/userSlice";

const TeacherClass = () => {
  // const IDs = useSelector((state) => state?.user?.currentUser?.data);
  const IDs = useSelector(userData).currentUser?.data!
  
  // const { data:getClasses, isLoading, mutate } = useGetClasses(
  //   IDs.school?.id,
  // );
  const [classDetails, setclassDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);


  // OPEN MODAL CONDITION
  const handleModalOpen = (modalEvent:string, data:any) => {
    switch (modalEvent) {
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

  const handleClassDelete = () => {};

  return (
    <>
      <div className={styles.dash}>
        <h3 className="headerTitle">Classes</h3>
        <div className={styles.classWrap}>
          {/* {getClasses?.map((item) => (
            <ClassCard
              key={item.id}
              // data={item}
              url={`/teacher/class/classroom`}
              handleClick={handleClassDelete}
            />
          ))} */}
          {/* {getClasses?.length <= 0 ? "No Classwork" : null} */}
          {/* {isLoading ? <Loader /> : null} */}
        </div>
      </div>
    </>
  );
};

export default TeacherClass;
