import React from "react";
import styles from "./cloudMenu.module.css";
import Image from "next/image";
import bar from "/public/assets/images/menuBar.png";
import cloud from "/public/assets/images/menuCloud.png";

const CloudMenu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.cloudAndBarWrap}>
          <Image src={cloud} className={styles.cloud} alt="cloud"/>
          <div className={styles.outerBarWrap}>
            <div className={styles.barWrap}>
              <ul className={styles.menus}>
                <li>Find teacher</li>
                <li>Community</li>
                <li>Become teacher</li>
                <li>Contact us</li>
              </ul>
              <Image src={bar} className={styles.bar} alt="green bar"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudMenu;
