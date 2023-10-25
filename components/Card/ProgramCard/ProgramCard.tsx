import React from 'react'
import styles from './programCard.module.css'
import Image from 'next/image'
import line from '/public/assets/images/line.png'
import { Program } from '@/types'

interface Props {
  program: Program
}
const ProgramCard = ({ program }: Props) => {
  return (
    <div className={styles.card}>
      <Image src={program.src} className={styles.image} alt={program.title} />
      <h1>{program.title}</h1>
      <Image src={line} className={styles.line} alt="line" />
      <p>{program.text}</p>
    </div>
  )
}

export default ProgramCard
