import React from 'react'
import styles from './assignVideoCard.module.css'
import { IVideoAssignment } from '@/types/assignment'
import { TiDocumentText } from 'react-icons/ti'
import { AiTwotoneDelete } from 'react-icons/ai'

interface AssignVideoCardProps {
  video: IVideoAssignment
  handleVideoDelete: (id: number) => void
}

const AssignVideoCard = ({ video, handleVideoDelete }: AssignVideoCardProps) => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.titleWrap}>
          <div className={styles.textWrap}>
            <TiDocumentText className="text-yelow" size={23} />
            <div>
              <p>{video?.module_id[0].title}</p>
              <p>({video?.course[0].title})</p>
            </div>
          </div>
          <button onClick={() => handleVideoDelete(video.id)}>
            <AiTwotoneDelete size={23} color="red" />
          </button>
        </div>
        <hr className="border-gray-300 my-3" />
        <div className={styles.detailWrap}>
          <div className={styles.detail}>
            <p>Deadline</p>
            <p>{video?.deadline}</p>
          </div>

          <div className={styles.detail}>
            <p>Mark</p>
            <p>{video?.mark}</p>
          </div>

          <div className={styles.detail}>
            <p>Attempts</p>
            <p>{video?.no_attempt}</p>
          </div>

          <div className={styles.detail}>
            <p>Time</p>
            <p>{video?.time} mins</p>
          </div>
          <div className={styles.detail}>
            <p>Video(s)</p>
            <p>{video?.videos_id.length}</p>
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

export default AssignVideoCard
