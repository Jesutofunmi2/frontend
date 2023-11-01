import React from 'react'
import styles from './assignModuleCard.module.css'
import { TiDocumentText } from 'react-icons/ti'
import { AiOutlineDelete } from 'react-icons/ai'
import AssignCard from '../AssignCard/AssignCard'
import Link from 'next/link'
import ful from '../../../public/assets/images/logo.png'
import Image from 'next/image'

interface AssignModuleProps {
  title: string
  module: any
  handleModuleDelete: (id: number) => void
}
const AssignModuleCard = ({ title, module, handleModuleDelete }: AssignModuleProps) => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.titleWrap}>
          <div className={styles.textWrap}>
            <TiDocumentText color="white" size={23} />
            <p>{title}</p>
          </div>
          <AiOutlineDelete size={23} onClick={() => handleModuleDelete(module.id)} />
        </div>

        <div className={styles.detailWrap}>
          <div className={styles.detail}>
            <p>Deadline</p>
            <p>{module?.deadline}</p>
          </div>

          <div className={styles.detail}>
            <p>Mark</p>
            <p>{module?.mark}</p>
          </div>

          <div className={styles.detail}>
            <p>Attempts</p>
            <p>{module?.no_attempt}</p>
          </div>

          <div className={styles.detail}>
            <p>Time</p>
            <p>{module?.time} minutes</p>
          </div>
          <hr className={styles.line} />

          {/* TOPICS */}
          <div className={styles.cardWrap}>
            {module?.topic.map((ele: any) => (
              <div className={styles.card2} key={ele.id}>
                <div
                  className={styles.innerWrap}
                  // onClick={() => navigate.push("/")}
                >
                  <Image src={ele?.media_url || ful} width={70} height={50} alt="pic" />
                  <div className={styles.cardTextWrap}>
                    <h4>{ele?.title || 'language'}</h4>
                    <p className={styles.downcardtext}>{ele?.title}loo</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr className={styles.line} />
          <span className={styles.submission}>Submissions</span>
        </div>
      </div>
    </>
  )
}

export default AssignModuleCard
