"use client"

import LevelCard from "@/components/Card/LevelCard/LevelCard";
import React from "react";
import styles from "./page.module.css";
import { FaPaperPlane } from "react-icons/fa";
import { BsAirplaneFill, BsRocketFill } from "react-icons/bs";
import { useGetLevel } from "@/services/api/level";

const LessonLevel = () => {
  const { data:level, isLoading } = useGetLevel();

  const fakedata = [
    { text: "Beginner Level", icon: <FaPaperPlane size={50}/> },
    { text: "Intermediate Level", icon: <BsAirplaneFill size={50}/> },
    { text: "Advanced Level", icon: <BsRocketFill size={50}/> },
  ];
  return (
    <>
      <div className={styles.container}>
        <h2>Select video lesson level</h2>
        <div className={styles.cardWrap}>
          {fakedata?.map((item) => (
            <LevelCard item={item} key={item.text} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LessonLevel;
