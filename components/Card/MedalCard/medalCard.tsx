import styles from "./medalCard.module.css";
import Link from "next/link";

const MedalCard = ({ item }:any) => {
  return (
    <Link href="/dashboard/video-course/level/medal/video" className={styles.card}>
      <span>{item.icon}</span>
      <h3>{item.text}</h3>
    </Link>
  );
};

export default MedalCard;
