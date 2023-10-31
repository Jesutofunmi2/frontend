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
// import NotFound from '@/components/NotFound/NotFound'
import { userData } from '@/services/redux/features/userSlice'
import { Loader } from '@/components/Loader/Loader'
import { useGetLanguages } from '@/services/api/languages'
import { Ilanguage } from '@/types/languages'
import { ClassArmPayload } from '@/types/classarm'

const Class = () => {
  const schoolID = useSelector(userData).currentSchool?.data.id!
  const [classDetails, setClassDetails] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [classArmOpen, setClassArmOpen] = useState<ClassArmPayload | null>(null)
  const [isOpenClassArm, setOpenClassArm] = useState(false)
  const [bulkOpen, setBulkOpen] = useState(false)
  const { data: allClassesData, isLoading, error, mutate } = useGetClasses(schoolID)
  const { data: languages } = useGetLanguages()
  if (!allClassesData || !languages) return
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
  const languageOptions = languages.map((item: Ilanguage) => {
    return { value: item.id, label: item.name }
  })
  // HANDLE COPY
  const handleCopy = () => {
    toast.success('Copied!', {
      position: toast.POSITION.TOP_RIGHT,
    })
  }



 



  const handleFormSubmit = (values: any) => {
    if (classDetails) {
      // editClass()
    } else {

      // mutate({ ...allClassesData, values })
      addClass(Number(schoolID), Number(values.language_id), values.class_room_name)
    }
    mutate()
    setModalOpen(false)
  }

  return (
    <>
      <div>
        <h3 className="headerTitle">Class Configuration</h3>
        <div className={styles.btnWrap}>
          <Button
            width="150px"
            height="30px"
            size="15px"
            text="Add Class"
            handleClick={() => handleModalOpen('add', null)}
          />

          <Button
            width="150px"
            height="30px"
            size="15px"
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
          handleFormSubmit={handleFormSubmit}
          languageOptions={languageOptions}
        />
      </Modal>

      {/* MODAL TO MODIFY STUDENTS */}
      <Modal open={bulkOpen} setOpen={setBulkOpen}>
        <BulkUpload />
      </Modal>
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
