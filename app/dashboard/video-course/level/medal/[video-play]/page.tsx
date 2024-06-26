'use client'

import VideoCourseSidebar from '@/components/Sidebar/VideoCourseSidebar/VideoCourseSidebar'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import VideoLessonQuestion from '@/components/videoLessonQuestion/VideoLessonQuestion'
import { useGetVideoCourse } from '@/services/api/videos'
import { Loader } from '@/components/Loader/Loader'
import useMediaQuery from '@/utils/hooks/useMediaQuery'
import { IVideos } from '@/types/videos'

const VideoPlay = () => {
  const courseID = String(sessionStorage.getItem('courseID'))
  const matches = useMediaQuery('(max-width: 1000px)')
  const [questionsPopup, setQuestionsPopup] = useState(false)
  const { data: videoLesson, isLoading } = useGetVideoCourse(courseID)
  const [videoData, setVideoData] = useState<IVideos | any>()
  const [videoLessonData, setVideoLessonData] = useState<IVideos[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)

  useEffect(() => {
    if (videoLesson && !videoData) {
      setVideoLessonData(videoLesson)
      setVideoData(videoLesson[0]?.topics[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoLesson])
  if (isLoading || !courseID || !videoLesson) {
    return <Loader />
  }
  const handleVideoEnd = () => {
    setQuestionsPopup(true)
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.videoAndProgressWrap}>
          {/* <ProgressBar percentage={50} width="600px" /> */}
          <div className={styles.videoWrap}>
            {questionsPopup && !matches ? (
              <VideoLessonQuestion
                question={videoData?.questions}
                questionIndex={questionIndex}
                setQuestionIndex={setQuestionIndex}
                setQuestionsPopup={setQuestionsPopup}
              />
            ) : null}
            {!isLoading ? (
              <video
                controls
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
                id="homeVideo"
                onEnded={() => handleVideoEnd()}
                width="100%"
                height="100%"
                key={videoData?.media_url}
              >
                <source src={videoData?.media_url} type="video/mp4" />
              </video>
            ) : null}
          </div>

          {/* QUESTIONS MOBILE VIEW*/}
          {/* {questionsPopup && matches ? (
            <VideoLessonQuestion
              question={videoData}
              questionIndex={questionIndex}
              setQuestionIndex={setQuestionIndex}
              setQuestionsPopup={setQuestionsPopup}
            />
          ) : null} */}

          {/* OVERVIEW */}
          {!isLoading ? (
            <div className={styles.aboutVideo}>
              <div className={styles.menu}>
                <span className="text-lg font-bold">Overview</span>
              </div>

              <p className="languageText">{videoData?.objective}</p>
            </div>
          ) : null}
        </div>
        <VideoCourseSidebar
          setVideoData={setVideoData}
          videoLessonData={videoLessonData}
          setQuestionsPopup={setQuestionsPopup}
          setQuestionIndex={setQuestionIndex}
        />
      </div>
      {isLoading ? <Loader /> : null}
    </>
  )
}

export default VideoPlay
