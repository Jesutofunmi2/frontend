import React from "react";
import styles from "./cloudTitle.module.css";

interface Props {
  title:string
}
const CloudTitle = ({title}:Props) => {
  return (
    <div className={styles.title}>
      <div className={styles.cloud}>
      <h1>{title}</h1>
      </div>
    </div>
  );
};

export default CloudTitle;
