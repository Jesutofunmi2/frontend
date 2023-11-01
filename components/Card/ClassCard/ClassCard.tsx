import React from 'react'
import styles from './classCard.module.css'
import { FaPeopleGroup } from 'react-icons/fa6'
import Link from 'next/link'
import { AiTwotoneDelete } from 'react-icons/ai'

interface ClassCardProps {
  data: any
  handleDeleteClass: (class_id: number) => void
  url: string
}

const ClassCard = ({ data, handleDeleteClass, url }: ClassCardProps) => {
  return (
    <>
      <div className={styles.card}>
        <AiTwotoneDelete
          size={25}
          className={styles.deleteIcon}
          onClick={() => {
            window.confirm('Delete this class?') && handleDeleteClass(data.id)
          }}
        />
        <Link
          href={{
            pathname: url,
            query: {
              id: data.id,
              // language: post.name,
            },
          }}
          className={styles.wrap}
        >
          <div className={styles.titleWrap}>
            <span>{data?.classs_room_name}</span>
          </div>
          <div className={styles.studentCount}>
            <FaPeopleGroup size={20} className={styles.icon} />
            <span>1 Students</span>
          </div>
        </Link>
      </div>
    </>
  )
}

export default ClassCard
