"use client";

import ProgressBar from "@/components/ProgressBar/ProgressBar";
import VideoCourseSidebar from "@/components/Sidebar/VideoCourseSidebar/VideoCourseSidebar";
import React, { useState } from "react";
import styles from "./page.module.css";
import VideoLessonQuestion from "@/components/videoLessonQuestion/VideoLessonQuestion";
import { useGetVideoPlay } from "@/services/api/videoplay";
import { Loader } from "@/components/Loader/Loader";
import useMediaQuery from "@/utils/hooks/useMediaQuery";

const VideoPlay = () => {
  const courseID = sessionStorage.getItem("courseID");
  const matches = useMediaQuery("(max-width: 1000px)");
  const [questionsPopup, setQuestionsPopup] = useState(false);
  const { data, isLoading } = useGetVideoPlay(courseID);
  const [videoData, setVideoData] = useState<any>({});
  const [questionIndex, setQuestionIndex] = useState(0);

  //first video in array data on page load
  const onPageloadVideoData = data?.data[0]?.topics[0];

  console.log(onPageloadVideoData);

  const handleVideoEnd = () => {
    setQuestionsPopup(true);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.videoAndProgressWrap}>
          {/* <ProgressBar percentage={50} width="600px" /> */}
          <div className={styles.videoWrap}>
            {questionsPopup && !matches ? (
              <VideoLessonQuestion
                question={videoData || onPageloadVideoData}
                questionIndex={questionIndex}
                setQuestionIndex={setQuestionIndex}
                setQuestionsPopup={setQuestionsPopup}
              />
            ) : null}
            {!isLoading ? (
              <video
                controls
                controlsList="nodownload"
                id="homeVideo"
                onEnded={() => handleVideoEnd()}
                width="100%"
                height="100%"
                key={videoData?.media_url || onPageloadVideoData?.media_url}
              >
                <source
                  src={videoData?.media_url || onPageloadVideoData?.media_url}
                  type="video/mp4"
                />
              </video>
            ) : null}
          </div>

          {/* QUESTIONS MOBILE VIEW*/}
          {/* {questionsPopup && matches ? (
            <VideoLessonQuestion
              question={videoData || onPageloadVideoData}
              questionIndex={questionIndex}
              setQuestionIndex={setQuestionIndex}
            />
          ) : null} */}

          {/* OVERVIEW */}
          {!isLoading ? (
            <div className={styles.aboutVideo}>
              <div className={styles.menu}>
                <span>Overview</span>
              </div>

              {/* <p className="languageText">
                {videoData?.objective || onPageloadVideoData?.objective}
              </p> */}
            </div>
          ) : null}
        </div>
        <VideoCourseSidebar
          setVideoData={setVideoData}
          data={data}
          setQuestionsPopup={setQuestionsPopup}
          setQuestionIndex={setQuestionIndex}
        />
      </div>
      {isLoading ? <Loader /> : null}
    </>
  );
};

export default VideoPlay;
