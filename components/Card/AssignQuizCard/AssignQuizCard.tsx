import React from 'react'
import styles from './assignQuizCard.module.css'
import { TiDocumentText } from 'react-icons/ti'
import { AiTwotoneDelete } from 'react-icons/ai'
import { IQuizAssignment } from '@/types/assignment'

interface AssignQuizCardProps {
  quiz: IQuizAssignment
  handleQuizDelete: (id: number) => void
}
const AssignQuizCard = ({ quiz, handleQuizDelete }: AssignQuizCardProps) => {

  return (
    <>
      <div className={styles.card}>
        <div className={styles.titleWrap}>
          <div className={styles.textWrap}>
            <TiDocumentText className="text-yelow" size={23} />
            <div>
              <p>{quiz?.topic[0].title}</p>
              <p>({quiz?.language[0].name})</p>
            </div>
          </div>
          <button onClick={() => handleQuizDelete(quiz.id)}>
            <AiTwotoneDelete size={23} color="red" />
          </button>
        </div>
        <hr className="border-gray-300 my-3" />
        <div className={styles.detailWrap}>
          <div className={styles.detail}>
            <p>Deadline</p>
            <p>{quiz?.deadline}</p>
          </div>

          <div className={styles.detail}>
            <p>Mark</p>
            <p>{quiz?.mark}</p>
          </div>

          <div className={styles.detail}>
            <p>Attempts</p>
            <p>{quiz?.no_attempt}</p>
          </div>

          <div className={styles.detail}>
            <p>Time</p>
            <p>{quiz?.time} mins</p>
          </div>
          <div className={styles.detail}>
            <p>Question(s)</p>
            <p>{quiz?.questions.length}</p>
          </div>
          {/* <hr className={styles.line} /> */}

          {/* TOPICS */}
          {/* <div className={styles.cardWrap}> */}
          {/* {quiz?.topic.map((ele: any) => (
              <div className={styles.card2} key={ele.id}>
                <div className={styles.innerWrap}>
                  <Image src={ele?.media_url || logo} width={70} height={50} alt="pic" />
                  <div className={styles.cardTextWrap}>
                    <h4>{ele?.title || 'language'}</h4>
                  </div>
                </div>
              </div>
            ))} */}
          {/* </div> */}
        </div>
      </div>
    </>
  )
}

export default AssignQuizCard
