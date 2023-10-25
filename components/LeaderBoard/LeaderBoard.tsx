import React from "react";
import styles from "./leaderBoard.module.css";
import arrowBoy from "/public/assets/images/arrowBoy.png"
import Image from "next/image";

const LeaderBoard = () => {
  return (
    <div className={styles.leaderboardContainer}>
      <p>
        Learning is fun with friends. See how you match up with your friends on
        the leaderboard.
      </p>

      <div className={styles.imgWrap}>
        <Image src={arrowBoy} className={styles.img} alt="arrow boy"/>
      </div>
    </div>
  );
};

export default LeaderBoard;
