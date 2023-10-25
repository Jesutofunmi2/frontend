import React from "react";
import styles from "./tab2.module.css";

const Tab2 = ({ handleToggle, data, toggle }) => {
  return (
    <>
      <div className={styles.container}>
        {data.map((item) => (
          <button
            className={toggle === item.title ? styles.btnActive : styles.btn}
            onClick={() => handleToggle(item.title)}
            key={item.id}
          >
            {item.title}
          </button>
        ))}
      </div>
    </>
  );
};

export default Tab2;
