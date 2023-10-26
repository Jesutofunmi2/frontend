"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import LessonsCard from "@/components/Card/lessonCard/LessonCard";
import { useGetLessons } from "@/services/APIs/lessons";
import { Loader } from "@/components/Loader/Loader";
import { useSearchParams } from "next/navigation";
import BackNavigation from "@/components/BackNavigation/BackNavigation";
import { Fade } from "react-awesome-reveal";
import { useSelector } from "react-redux";

const Lessons = () => {
  const searchParams = useSearchParams();
  const languageID = searchParams.get("lang");
  const { data, isValidating } = useGetLessons(languageID);
  const language = searchParams.get("language");
  const [imageLoaded, setImageLoaded] = useState();
  const lessonData = useSelector((state) => state?.lessons?.data);


  

  return (
    <>
      <div className={styles.lessons}>
        <div className={styles.headerWrap}>
          <span className={styles.backIcon}>
            <BackNavigation />
          </span>
          <h1 className={styles.title}>Lessons</h1>
        </div>
        <div className={styles.wrapper}>
          {data?.data?.map((post) => (
            <LessonsCard
              key={post?.id}
              post={post}
              languageID={languageID}
              language={language}
              setImageLoaded={setImageLoaded}
            />
          ))}
        </div>
        {!lessonData ? <Loader /> : null}
      </div>
    </>
  );
};

export default Lessons;
