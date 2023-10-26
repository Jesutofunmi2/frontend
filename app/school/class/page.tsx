"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Table from "@/components/Table/Table";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import AddEditStudents from "@/components/Form/Forms/AddEditStudents/AddEditStudents";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { RiDeleteBin6Line, RiFileCopyLine } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import {
  useAddStudent,
  useDeleteStudent,
  useEditStudent,
  useGetStudents,
} from "@/services/APIs/student";
import BulkUpload from "@/components/BulkUpload/BulkUpload";
import AddEditClass from "@/components/Form/Forms/AddEditClass/AddEditClass";
import { useGetClasses } from "@/services/APIs/class";
import ClassTable from "@/components/Table/ClassTable/ClassTable";
import AddClassArmForm from "@/components/Form/Forms/AddClassArmForm/AddClassArmForm";
import NotFound from "@/components/NotFound/NotFound";

const Class = () => {
  const IDs = useSelector((state) => state?.user?.currentSchool?.data);
  const { mutate, data, isMutating } = useGetClasses(
    IDs?.id
  )
  const [studentDetails, setStudentDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [armOpenwithID, setArmOpenWithID] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const { trigger: deleteStudent } = useDeleteStudent(mutate);
  const { trigger: addStudent } = useAddStudent(mutate);
  const { trigger: editStudent } = useEditStudent(mutate);
  const [payloadData, setPayloadData] = useState({
    school_id: `${IDs}`,
    first_name: "",
    last_name: "",
    language: "",
    age: "",
    gendar: "",
    country: "",
  });


  // OPEN MODAL CONDITION
  const handleModalOpen = (evt, data) => {
    switch (evt) {
      case "add":
        setModalOpen(true);
        setStudentDetails(null);
        break;
      case "edit":
        setModalOpen(true);
        setStudentDetails(data);
        break;
      case "bulk":
        setBulkOpen(true);
        case "arm":
        setModalOpen(true);
        setStudentDetails(data);
        break;
      default:
        break;
    }
  };

  // HANDLE COPY
  const handleCopy = () => {
    toast.success("Copied!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // HANDLE DELETE STUDENT
  const handleDelete = (studentID) => {
    console.log(studentID);
    deleteStudent(studentID);
  };

  // Remove school_id from payload data. school_id is not required in edit.
  const { school_id, ...newPayload } = payloadData;

  // SUBMIT FORM CONDITION
  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentDetails) {
      editStudent({
        payload: newPayload,
        id: studentDetails?.student_id,
      });
    } else {
      addStudent(payloadData);
    }
  };

 

  return (
    <>
      <div>
        <h3 className="headerTitle">Class Configuration</h3>
        <div className={styles.btnWrap}>
          <Button
            width="150px"
            height="30px"
            size="15px"
            text="Add Class"
            handleClick={() => handleModalOpen("add", "")}
          />

          <Button
            width="150px"
            height="30px"
            size="15px"
            text="Bulk Registration"
            backgroundColor="lightGreen"
            handleClick={() => handleModalOpen("bulk", "")}
          />
        </div>
        {/* <Table head={tableHead} body={tableBody}/> */}
        <ClassTable body={data?.data} setArmOpenWithID={setArmOpenWithID}/>
       {data?.data?.length === 0 ?  <NotFound text="No Class Found:("/> : null}
      </div>
      {/* MODAL TO MODIFY USERS */}
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <AddEditClass
          title={studentDetails ? "Edit Class" : "Add Class"}
          payloadData={payloadData}
          setPayloadData={setPayloadData}
          handleSubmit={handleSubmit}
          studentDetails={studentDetails}
          mutate={mutate}
          data={data}
          setModalOpen={setModalOpen}
        />
      </Modal>

      {/* MODAL TO MODIFY STUDENTS */}
      <Modal open={bulkOpen} setOpen={setBulkOpen}>
        <BulkUpload />
      </Modal>
      <ToastContainer />

      {/* ADD CLASS ARM MODAL */}
      <Modal open={armOpenwithID ? true : false} setOpen={setArmOpenWithID}>
        <AddClassArmForm mutate={mutate} armOpenwithID={armOpenwithID} setArmOpenWithID={setArmOpenWithID}/>
      </Modal>
    </>
  );
};

export default Class;
