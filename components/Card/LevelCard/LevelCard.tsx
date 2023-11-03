import React from "react";
import styles from "./levelCard.module.css";
import Link from "next/link";

const LevelCard = ({ item }:any) => {
  return (
    <Link href="/dashboard/video-course/level/medal" className={styles.card}>
      <span>{item.icon}</span>
      <h3>{item.text}</h3>
    </Link>
  );
};

export default LevelCard;
