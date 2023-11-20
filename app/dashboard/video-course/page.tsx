'use client'

import React from 'react'
import styles from './page.module.css'
import { useGetVideoCourse } from '@/services/api/videoCourse'
import VideoCourseCard from '@/components/Card/VideoCourseCard/VideoCourseCard'
import { Loader } from '@/components/Loader/Loader'
import { VideoCourse } from '@/types/videocourse'

const VideoLesson = () => {
  const { data: videoCourses, isLoading, error } = useGetVideoCourse()
  if (!videoCourses) return null
  if (isLoading) return <Loader />
  if (error) return <p>error page</p>
  return (
    <>
      <div className={styles.container}>
        <h2 className="text-center text-2xl font-bold">Select Language</h2>

        <div className="mt-10 gap-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          {videoCourses.map((video: VideoCourse) => (
            <VideoCourseCard video={video} key={video.id} />
          ))}
        </div>
      </div>
    </>
  )
}

export default VideoLesson
