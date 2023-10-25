import React from 'react'
import styles from './OurPrograms.module.css'
import ProgramCard from '../Card/ProgramCard/ProgramCard'
import { programs } from './data'
import { Program } from '@/types'

const OurPrograms = () => {
  return (
    <div className={styles.program}>
      {programs.map((program: Program) => (
        <ProgramCard program={program} key={program.src} />
      ))}
    </div>
  )
}

export default OurPrograms
