"use client"

import React from "react";
import styles from "./page.module.css";
import { useGetVideoCourse } from "@/services/api/videoCourse";
import VideoCourseCard from "@/components/Card/VideoCourseCard/VideoCourseCard";
import { Loader } from "@/components/Loader/Loader";
import { VideoCourse } from "@/types/videocourse";

const VideoLesson = () => {
  const { data:videoCourses, isLoading,error } = useGetVideoCourse();
  if (!videoCourses) return null
  if (isLoading) return <Loader />
  if (error) return <p>error page</p>

  return (
    <>
      <div className={styles.container}>
        <h2>Select Language</h2>

        <div className={styles.cardWrap}>
          {videoCourses.map((video:VideoCourse) => (
            <VideoCourseCard video={video} key={video.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoLesson;
