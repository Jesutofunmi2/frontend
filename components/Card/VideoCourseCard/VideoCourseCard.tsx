import React from 'react'
import styles from './videoCourseCard.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { VideoCourse } from '@/types/videocourse'

interface VideoCourseCard {
  video: VideoCourse
}
const VideoCourseCard = ({ video }: VideoCourseCard) => {
  const handleclick = (video: VideoCourse) => {
    sessionStorage.setItem('courseID', video?.id)
  }

  return (
    <>
      <div className={styles.container}>
        {video?.status <= 0 ? <div className={styles.overlay}></div> : null}
        <Link
          href={{
            pathname: '/dashboard/video-course/level',
            query: {
              course_id: video.id,
            },
          }}
          className={styles.card}
          onClick={() => handleclick(video)}
        >
          <div className={styles.card}>
            <Image
              src={video?.image_url}
              className={styles.img}
              width={400}
              height={100}
              alt={video?.title}
            />
            <hr className={styles.break} />
            <h3>{video?.title}</h3>
          </div>
        </Link>
      </div>
    </>
  )
}

export default VideoCourseCard
