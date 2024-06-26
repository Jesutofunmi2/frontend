import React from 'react'
import styles from './classCard.module.css'
import { FaPeopleGroup } from 'react-icons/fa6'
import Link from 'next/link'

interface ClassCardProps {
  classroom: any
  url: string
}

const ClassCard = ({ classroom, url }: ClassCardProps) => {

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
            <span className='text-lg'>{classroom.class[0]?.name}</span>
          </div>
          <div className={styles.studentCount}>
            <FaPeopleGroup size={20} className={styles.icon} />
            <span className='text-sm'>Class Arm: {classroom.class_arm[0]?.name}</span>
          </div>
        </Link>
      </div>
    </>
  )
}

export default ClassCard
