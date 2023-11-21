import React, { useState } from 'react'
import styles from './classworkCard.module.css'
import { AiTwotoneDelete } from 'react-icons/ai'
import { RiAttachment2 } from 'react-icons/ri'
import Modal from '@/components/Modal/Modal'
import ViewAttachment from '@/components/ViewAttachment/ViewAttachment'
import { TitleCase } from '@/utils'

interface ClassworkCardProps {
  data: any
  handleDeleteClasswork: (data: any) => void
}
const ClassworkCard = ({ data, handleDeleteClasswork }: ClassworkCardProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <div className={styles.card}>
        <AiTwotoneDelete
          size={23}
          color="red"
          className={styles.icon}
          onClick={() => {
            window.confirm('Delete this class?') && handleDeleteClasswork(data)
          }}
        />
        <div className={styles.wrap}>
          <div className={styles.studentCount}>
            <span>{TitleCase(data?.name)}</span>
          </div>
          <button onClick={() => setModalOpen(true)} className={styles.attachment}>
            <RiAttachment2 size={22} /> See Attachment
          </button>
        </div>
      </div>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <ViewAttachment url={data?.media_url} />
      </Modal>
    </>
  )
}

export default ClassworkCard
