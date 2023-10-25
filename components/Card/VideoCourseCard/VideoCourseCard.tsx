import React from "react";
import styles from "./videoCourseCard.module.css";
import { BiUser } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

const VideoCourseCard = ({ item }) => {
  const handleclick = (itm) => {
    sessionStorage.setItem("courseID", itm?.id);
  };

  return (
    <>
      <div className={styles.container}>
        {item?.status <= 0 ? <div className={styles.overlay}></div> : null}
        <Link
          href={{
            pathname: "/dashboard/video-course/level",
          }}
          className={styles.card}
          onClick={()=>handleclick(item)}
        >
          <div className={styles.card}>
            <Image
              src={item?.image_url}
              className={styles.img}
              width={400}
              height={100}
              alt={item?.title}
            />
            <hr className={styles.break} />
            <h3>{item?.title}</h3>
          </div>
        </Link>
      </div>
    </>
  );
};

export default VideoCourseCard;
