'use client'

import React, { useState } from 'react'
import styles from './page.module.css'
import Modal from '@/components/Modal/Modal'
import Button from '@/components/Button/Button'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addClass, addClassArm, deleteClass, useGetClasses } from '@/services/api/school/class'
import BulkUpload from '@/components/BulkUpload/BulkUpload'
import AddEditClass from '@/components/Form/Forms/AddEditClass/AddEditClass'
import ClassTable from '@/components/Table/ClassTable/ClassTable'
import AddClassArmForm from '@/components/Form/Forms/AddClassArmForm/AddClassArmForm'
import { userData } from '@/services/redux/features/userSlice'
import { Loader } from '@/components/Loader/Loader'
import { ClassArmPayload } from '@/types/classarm'

const Class = () => {
  const schoolID = Number(useSelector(userData).currentSchool?.data.id!)
  const [classDetails, setClassDetails] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [classArmOpen, setClassArmOpen] = useState<ClassArmPayload | null>(null)
  const [isOpenClassArm, setOpenClassArm] = useState(false)
  const [bulkOpen, setBulkOpen] = useState(false)
  const { data: allClassesData, isLoading, error, mutate } = useGetClasses(schoolID)

  if (!allClassesData) return
  if (isLoading) return <Loader />
  if (error) return <p>error page</p>

  // OPEN MODAL CONDITION
  const handleModalOpen = (modalEvent: string, data: null) => {
    switch (modalEvent) {
      case 'add':
        setModalOpen(true)
        setClassDetails(null)
        break
      case 'edit':
        setModalOpen(true)
        setClassDetails(data)
        break
      case 'bulk':
        setBulkOpen(true)
      case 'arm':
        setModalOpen(true)
        setClassDetails(data)
        break
      default:
        break
    }
  }

  // Options for languages

  // HANDLE COPY
  const handleCopy = () => {
    toast.success('Copied!', {
      position: toast.POSITION.TOP_RIGHT,
    })
  }

  return (
    <>
      <div>
        <h3 className="p-4 rounded-xl bg-white">Class Configuration</h3>
        <div className={styles.btnWrap}>
          <Button text="Add Class" handleClick={() => handleModalOpen('add', null)} />
          <Button
            text="Bulk Registration"
            backgroundColor="lightGreen"
            handleClick={() => handleModalOpen('bulk', null)}
          />
        </div>

        <ClassTable
          body={allClassesData}
          mutate={mutate}
          schoolID={Number(schoolID)}
          setOpenClassArm={setOpenClassArm}
          setClassArmOpen={setClassArmOpen}
        />
      </div>
      {/* MODAL TO MODIFY USERS */}
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <AddEditClass
          title={classDetails ? 'Edit Class' : 'Add Class'}
          setModalOpen={setModalOpen}
          schoolID={schoolID}
          mutate={mutate}
          classDetails={classDetails}
        />
      </Modal>

      {/* MODAL TO MODIFY STUDENTS */}
      {/* <Modal open={bulkOpen} setOpen={setBulkOpen}>
        <BulkUpload />
      </Modal> */}
      <ToastContainer />

      {/* ADD CLASS ARM MODAL */}
      <Modal open={isOpenClassArm} setOpen={setOpenClassArm}>
        <AddClassArmForm
          mutate={mutate}
          schoolID={Number(schoolID)}
          classArmOpen={classArmOpen}
          setOpenClassArm={setOpenClassArm}
        />
      </Modal>
    </>
  )
}

export default Class
