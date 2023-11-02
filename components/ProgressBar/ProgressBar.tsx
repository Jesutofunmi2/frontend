import React from "react";
import styles from "./progressBar.module.css";

interface ProgressbarProps{
  width?:string, percentage:number
}
const ProgressBar = ({ width, percentage }:ProgressbarProps) => {

  return (
    <>
      <div className={styles.PBContainer} style={{ maxWidth: `${width}` }}>
        <div
          className={styles.progress}
          style={{ backgroundColor: "#A1D363", width: `${percentage}%` }}
        >
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
