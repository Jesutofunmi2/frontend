"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Tab1 from "@/components/Tab/Tab1/Tab1";
import { BsPeople } from "react-icons/bs";
import { TfiBlackboard } from "react-icons/tfi";
import { MdPersonAddAlt } from "react-icons/md";
import Table from "@/components/Table/Table";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import BackNavigation from "@/components/BackNavigation/BackNavigation";
import { useSearchParams } from "next/navigation";
import ClassworkView from "@/components/Views/ClassworkView/ClassworkView";
import AssignmentView from "@/components/Views/AssigmentView/AssigmentView";
import GradebookView from "@/components/Views/GradebookView/GradebookView";
import { PiBookOpenBold } from "react-icons/pi";
// import { useGetAssignedModuleStudent } from "@/services/api/module";


const tabData = [
  { text: "Students", icon: <BsPeople /> },
  { text: "Classwork", icon: <TfiBlackboard /> },
  { text: "Assignment", icon: <MdPersonAddAlt /> },
  { text: "Gradebook", icon:<PiBookOpenBold /> },
];

const ClassRoom = () => {
  const searchParams = useSearchParams();
  const [toggleTab, setToggleTab] = useState("Students");
  const activeTab = String(searchParams.get("tab"))
  // const teacherData = useSelector((state) => state?.user?.currentTeacher?.data);

const handleActiveTab=(activeTab: 'Students' | 'Classwork' | 'Assignment' | 'Gradebook')=>{

}
  // // Get assigned module API request hook
  // const { data: assignedModule } = useGetAssignedModuleStudent({
  //   school_id: `${teacherData?.school?.id}`,
  //   teacher_id: `${teacherData?.teacher_id}`,
  // });

  // TABLE HEAD
  const tableHead = ["NAME", "LANGUAGE", "GENDER", ""];

  // TABLE BODY
  const tableBody = () => {
    return (
      <tr>
        <td>James</td>
        <td>Idoma</td>
        <td>Male</td>
        <td>
          <div className="action">
            <AiFillEdit className="editIcon" />
            <RiDeleteBin6Line className="deleteIcon" />
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div>
        <BackNavigation />
        <h3 className="headerTitle">Yoruba Language</h3>
        <div className={styles.tabWrap}>
          <Tab1
           tabData={tabData}
            // toggleTab={toggleTab}
            // setToggleTab={setToggleTab}
            handleActiveTab={handleActiveTab}
            activeTab={activeTab}
            // url="/dashboard/classroom/class?tab"
          />
        </div>

        <div className={styles.views}>
          <h3>{toggleTab}</h3>

          <div className={styles.sectionWrap}>
            {activeTab === "Students" ? (
              <Table head={tableHead} body={tableBody} />
            ) : activeTab === "Quiz" ? (
              <ClassworkView />
            ) : activeTab === "Assignment" ? (
              <AssignmentView />
            ) : activeTab === "Gradebook" ? (
              <GradebookView />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassRoom;
