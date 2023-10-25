import React from "react";
import styles from "./statsCloud.module.css";
import stat from "/public/assets/images/statCloud.png";
import Image from "next/image";

const StatsCloud = () => {
  return (
    <section className={styles.statCloud}>
      <div className={styles.wrap}> 
      <ul className={styles.menu}>
        <li className={styles.stats}>
          <h1>250+</h1>
          <p>Happy Kids</p>
        </li>
        <li>
          <h1>250+</h1>
          <p>Happy Kids</p>
        </li>
        <li>
          <h1>250+</h1>
          <p>Happy Kids</p>
        </li>
      </ul>
      <Image src={stat} className={styles.img} alt="stats cloud"/>
      </div>
    </section>
  );
};

export default StatsCloud;
