import React from "react";
import styles from "./progressBar.module.css";

const ProgressBar = ({ width, percentage }) => {

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
