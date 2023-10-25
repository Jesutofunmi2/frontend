import React from "react";
import styles from "./featureCard.module.css";
import { FaUserFriends, FaPeopleGroup } from "react-icons/fa";

const FeatureCard = ({ data }) => {
  
  return (
    <>
      <div className={styles.card}>
        <div className={styles.textWrap}>
          <span className={styles.figure}>{data ? data.figure : null}</span>
          <span>{data ? data.title : null}</span>
        </div>
        {data ? data.icon : null}
      </div>
    </>
  );
};

export default FeatureCard;
