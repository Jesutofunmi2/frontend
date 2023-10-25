import React, { useState } from "react";
import styles from "./classworkView.module.css";
import Button from "../../Button/Button";
import ClassworkCard from "../../Card/ClassworkCard/ClassworkCard";
import Link from "next/link";
import AssignModuleCard from "@/components/Card/AssignModuleCard/AssignModuleCard";
import { useDeleteClasswork, useGetClasswork } from "@/services/APIs/classwork";
import { usePathname, useSearchParams } from "next/navigation";

const ClassworkView = ({ path, classworkData, assignedModule, handleClassDelete, handleModuleDelete }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const classID = searchParams.get("id");
 
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.buttonWrap}>
          <Link href={{
            pathname: `/teacher/class/classroom/add-classwork`,
            query: {
              id: classID,
            },
          }}>
            <Button
              text="Add Classwork"
              width="200px"
              // handleClick={() => handleModalOpen(true)}
            />
          </Link>
        </div>

        <div className={styles.cardWrap}>
          <p className={styles.cardTitle}>CLASSWORK:</p>
          <div className={styles.cards}>
            {classworkData?.data.map((item) => (
              <ClassworkCard
                data={item}
                key={item.id}
                handleClick={handleClassDelete}
              />
            ))}
            {classworkData?.data.length <= 0 ? (
              <span className={styles.noItem}>No Classwork</span>
            ) : null}
          </div>
        </div>

        <div className={styles.cardWrap}>
          <p className={styles.cardTitle}>MODULE CLASSWORK:</p>
          <div className={styles.cards}>
            {assignedModule?.data?.map((item) => (
              <AssignModuleCard path={pathname} item={item} key={item.id} handleModuleDelete={handleModuleDelete}/>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassworkView;
