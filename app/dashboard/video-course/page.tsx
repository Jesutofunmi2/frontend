"use client"

import React from "react";
import styles from "./page.module.css";
import { useGetVideoCourse } from "@/services/APIs/videoCourse";
import VideoCourseCard from "@/components/Card/VideoCourseCard/VideoCourseCard";

const VideoLesson = () => {
  const { data, isLoading } = useGetVideoCourse();

  const fakedata = ["a", "b", "", "c", "d", "e", "f", "g"];


  return (
    <>
      <div className={styles.container}>
        <h2>Select Language</h2>

        <div className={styles.cardWrap}>
          {data?.data?.map((item) => (
            <VideoCourseCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoLesson;
