import React from "react";
import styles from "./notificationCard.module.css";
import { BiBell } from "react-icons/bi";

const NotificationCard = () => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.content}>
          <BiBell size={50} className={styles.icon} />
          <div className={styles.textWrap}>
            <h3>Welcome</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim
              deleniti ut magni necessitatibus tempore ratione labore excepturi
            </p>
          </div>
        </div>

        <p className={styles.date}>12/01/2023</p>
      </div>
    </>
  );
};

export default NotificationCard;
