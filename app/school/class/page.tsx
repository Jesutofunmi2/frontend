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
import NotFound from '@/components/NotFound/NotFound'
import { userData } from '@/services/redux/features/userSlice'
import { Loader } from '@/components/Loader/Loader'
import { useGetLanguages } from '@/services/api/languages'
import { Ilanguage } from '@/types/languages'

const Class = () => {
  const schoolID = useSelector(userData).currentSchool?.data.id!
  const [classDetails, setClassDetails] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [armOpenwithID, setArmOpenWithID] = useState(false)
  const [bulkOpen, setBulkOpen] = useState(false)
  const [payloadData, setPayloadData] = useState({
    school_id: `${schoolID}`,
    first_name: '',
    last_name: '',
    language: '',
    age: '',
    gendar: '',
    country: '',
  })
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

  // HANDLE DELETE STUDENT
  // const handleDelete = (studentID) => {
  //   // console.log(studentID);
  //   deleteStudent(studentID);
  // };

  // Remove school_id from payload data. school_id is not required in edit.
  const { school_id, ...newPayload } = payloadData

  // SUBMIT FORM CONDITION
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (classDetails) {
      // editClass()
    } else {
      // addClass(payloadData)
    }
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
        {/* <Table head={tableHead} body={tableBody}/> */}
        <ClassTable body={allClassesData} setArmOpenWithID={setArmOpenWithID} />
        {/* {classData?.data?.length === 0 ? <NotFound text="No Class Found:(" /> : null} */}
      </div>
      {/* MODAL TO MODIFY USERS */}
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <AddEditClass
          title={classDetails ? 'Edit Class' : 'Add Class'}
          handleFormSubmit={handleSubmit}
          classDetails={classDetails}
          languageOptions ={languageOptions }
        />
      </Modal>

      {/* MODAL TO MODIFY STUDENTS */}
      <Modal open={bulkOpen} setOpen={setBulkOpen}>
        <BulkUpload />
      </Modal>
      <ToastContainer />

      {/* ADD CLASS ARM MODAL */}
      <Modal open={armOpenwithID ? true : false} setOpen={setArmOpenWithID}>
        {/* <AddClassArmForm
          mutate={mutate}
          armOpenwithID={armOpenwithID}
          setArmOpenWithID={setArmOpenWithID}
        /> */}
      </Modal>
    </>
  )
}

export default Class
