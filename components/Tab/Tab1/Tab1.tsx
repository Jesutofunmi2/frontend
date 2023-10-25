import React from "react";
import styles from "./tab1.module.css";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { currentTab } from "@/services/redux/features/tabSlice";

const Tab1 = ({ data, activeTab  }) => {
  const router = useRouter();
  const dispatch = useDispatch()
  
  const handleClick = (arg) => {
    dispatch(currentTab(arg))
  };

  return (
    <>
      <div className={styles.container}>
        {data?.map((item) => (
          <div
            className={activeTab === item.text ? styles.active : styles.card}
            key={item.text}
            onClick={() => handleClick(item.text)}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </>
  );
};
export default Tab1;
