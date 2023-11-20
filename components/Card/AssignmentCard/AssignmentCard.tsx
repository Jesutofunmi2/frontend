import React, { useState } from 'react'
import styles from './assignmentCard.module.css'
import { TiDocumentText } from 'react-icons/ti'
import { AiOutlineDelete, AiTwotoneDelete } from 'react-icons/ai'
import { RiAttachment2 } from 'react-icons/ri'
import ViewAttachment from '@/components/ViewAttachment/ViewAttachment'
import Modal from '@/components/Modal/Modal'
import { TitleCase } from '@/utils'

interface AssignmentCardProps {
  ele: {
    deadline: string
    id: number
    name: string
    media_url: string
  }
  handleFileAssignmentDelete: (id: number) => void
}
const AssignmentCard = ({ ele, handleFileAssignmentDelete }: AssignmentCardProps) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  return (
    <>
      <div className={styles.card}>
        <div className={styles.titleWrap}>
          <div className={styles.textWrap}>
            <TiDocumentText color="white" size={23} />
            <p>{TitleCase(ele.name)}</p>
          </div>
          <button onClick={() => handleFileAssignmentDelete(ele.id)}>
            <AiTwotoneDelete size={23} color="red" />
          </button>
        </div>

        <div className={styles.detailWrap}>
          <div className={styles.detail}>
            <p>Deadline</p>
            <p>{ele.deadline}</p>
          </div>

          <div className={styles.attachmentWrap}>
            <div className={styles.attachment}>
              <RiAttachment2 />
              <button onClick={() => setPreviewOpen(true)}>View Attachment</button>
            </div>
          </div>
        </div>
      </div>
      <Modal open={previewOpen} setOpen={setPreviewOpen}>
        <ViewAttachment url={ele.media_url} />
      </Modal>
    </>
  )
}

export default AssignmentCard
