import React from 'react'
import styles from './assignQuizCard.module.css'

interface AssignQuizCardProps {
  item: any
  handleSelectQuiz: (e: any, item: any) => void
}
const AssignQuizCard = ({ item, handleSelectQuiz }: AssignQuizCardProps) => {
  return (
    <>
      <div className={styles.card}>
        <input
          type="checkbox"
          className={styles.checkBox}
          onChange={(e) => handleSelectQuiz(e, item)}
        />
        <p>{item.title}</p>
      </div>
    </>
  )
}

export default AssignQuizCard
