import React from 'react'
import styles from './classCard.module.css'
import { FaPeopleGroup } from 'react-icons/fa6'
import Link from 'next/link'

interface ClassCardProps {
  classroom: any
  url: string
}

const ClassCard = ({ classroom, url }: ClassCardProps) => {
  // console.log(classroom)
  return (
    <>
      <div className={styles.card}>
        <Link
          href={{
            pathname: url,
            query: {
              id: classroom.id,
            },
          }}
          className={styles.wrap}
        >
          <div className={styles.titleWrap}>
            <span>{classroom.class[0]?.name}</span>
          </div>
          <div className={styles.studentCount}>
            <FaPeopleGroup size={20} className={styles.icon} />
            <span>{classroom.class_arm[0]?.name}</span>
          </div>
        </Link>
      </div>
    </>
  )
}

export default ClassCard
