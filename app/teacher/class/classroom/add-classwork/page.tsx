"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import BackNavigation from "@/components/BackNavigation/BackNavigation";
import Button from "@/components/Button/Button";
import { useGetLessons } from "@/services/api/lessons";
import Modal from "@/components/Modal/Modal";
import { Spinner } from "@/components/Loader/Loader";
import Tab2 from "@/components/Tab/Tab2/Tab2";
import AssignClassworkView from "@/components/Views/AssignClassworkView/AssignClassworkView";
import AssignModuleView from "@/components/Views/AssignModuleView/AssignModuleView";
import AddModuleForm from "@/components/Form/Forms/AddModuleForm/AddModuleForm";
import { addClasswork } from "@/services/api/classwork";

const tabData = [
  { id: 1, title: "Assign Classwork" },
  { id: 2, title: "Assign Module" },
];

const AddClassworkPage = () => {
  const [selectModule, setselectModule] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  // const { data, isValidating } = useGetLessons();
  // const {} = addClasswork();
  const [toggle, setToggle] = useState("Assign Classwork");
  const [payloadData, setPayloadData] = useState({
    first_name: "",
    gendar: "",
  });

  // TOGGLE USERS
  const handleToggle = (event:any) => {
    setToggle(event);
  };

  return (
    <>
      <div>
        <BackNavigation />
        <h3 className="headerTitle">Add Classwork</h3>
        <div className={styles.body}>
          <div className={styles.tabWrap}>
            <Tab2 handleToggle={handleToggle} data={tabData} toggle={toggle} />
          </div>

          {toggle === "Assign Classwork" ? (
            <AssignClassworkView  />
          ) : (
            <AssignModuleView
              data={data}
              isValidating={isValidating}
              setselectModule={setselectModule}
              selectModule={selectModule}
            />
          )}
        </div>
      </div>
      {/* MODAL*/}
      {/* <Modal open={modalOpen} setOpen={setModalOpen}>
        <AddModuleForm
          payloadData={payloadData}
          setPayloadData={setPayloadData}
          selectModule={selectModule}
        />
      </Modal> */}
    </>
  );
};

export default AddClassworkPage;
