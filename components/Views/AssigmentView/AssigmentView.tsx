import React, { useState } from 'react'
import styles from './assigmentView.module.css'
import Button from '../../Button/Button'
import Modal from '../../Modal/Modal'
import Link from 'next/link'
import AssignVideoCard from '@/components/Card/AssignVideoCard/AssignVideoCard'
import AssignModuleCard from '../../Card/AssignModuleCard/AssignModuleCard'
import AssignmentCard from '@/components/Card/AssignmentCard/AssignmentCard'
import AssignmentForm from '@/components/Form/Forms/AssignmentForm/AssignmentForm'
import AssignVideoForm from '@/components/Form/Forms/AssignVideoForm/AssignVideoForm'
import AddModuleForm from '../../Form/Forms/AddModuleForm/AddModuleForm'
import AddFileForm from '@/components/Form/Forms/AddFileForm/AddFileForm'

interface AssignmentProps {
  handleAddFile: (formdata: any, reset:()=>void) => void
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}
const AssignmentView = ({ handleAddFile, openModal, setOpenModal }: AssignmentProps) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.buttonWrap}>
          <Button text="Add File" handleClick={() => setOpenModal(true)} />
          <Link href="/teacher/class/i/assign-module">
            <Button text="Add Module"/>
          </Link>
          <Button text="Add Video"  />
          <Button text="Add Quiz" />
        </div>

        <div className={styles.cardWrap}>
          <p className={styles.cardTitle}>FILE ASSIGNMENT:</p>
          <div className={styles.cards}>
            <AssignmentCard />
            <AssignmentCard />
          </div>
        </div>

        <div className={styles.cardWrap}>
          <p className={styles.cardTitle}>MODULE ASSIGNMENTS:</p>
          <div className={styles.cards}>
             {/* <AssignModuleCard /> */}
            {/* <AssignModuleCard /> */}
            {/* <AssignModuleCard /> */}
            {/* <span className={styles.notAvailable}>No Module Assignment</span> */}
          </div>
        </div>

        <div className={styles.cardWrap}>
          <p className={styles.cardTitle}>VIDEO ASSIGNMENTS:</p>
          <div className={styles.cards}>{/* <AssignVideoCard /> */}</div>
        </div>

        <div className={styles.cardWrap}>
          <p className={styles.cardTitle}>QUIZ ASSIGNMENTS:</p>
          <div className={styles.cards}>{/* <AssignModuleCard /> */}</div>
        </div>
      </div>

      {/* MODALs */}
      <Modal open={openModal} setOpen={setOpenModal}>
        <AddFileForm handleAddFile={handleAddFile} />
      </Modal>

      {/* <Modal open={modal} setOpen={setModal}>
        <AssignVideoForm />
      </Modal> */}
    </>
  )
}

export default AssignmentView
