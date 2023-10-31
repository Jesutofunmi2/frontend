'use client'

import React, { useState } from 'react'
import styles from './page.module.css'
import Table from '@/components/Table/Table'
import Modal from '@/components/Modal/Modal'
import Button from '@/components/Button/Button'
import AddEditStudents from '@/components/Form/Forms/AddEditStudents/AddEditStudents'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { RiDeleteBin6Line, RiFileCopyLine } from 'react-icons/ri'
import { AiFillEdit } from 'react-icons/ai'
import {
  addStudent,
  deleteStudent,
  editStudent,
  useGetStudents,
} from '@/services/api/school/student'
import BulkUpload from '@/components/BulkUpload/BulkUpload'
import { useGetClasses } from '@/services/api/school/class'
import { Loader } from '@/components/Loader/Loader'
import { userData } from '@/services/redux/features/userSlice'
import { IFormStudent } from '@/types/student'

const Student = () => {
  const schoolID = useSelector(userData).currentSchool?.data.id!
  const [studentDetails, setStudentDetails] = useState<any | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [bulkOpen, setBulkOpen] = useState(false)
  const { data: allClasses } = useGetClasses(schoolID)
  const { error, data: allStudentsData, isLoading, mutate } = useGetStudents(schoolID)
  if (!allStudentsData) return null
  if (isLoading) return <Loader />
  if (error) return <p>error page</p>

  // OPEN MODAL CONDITION
  const handleModalOpen = (modalEvent: string, studentData: IFormStudent | null) => {
    switch (modalEvent) {
      case 'add':
        setModalOpen(true)
        setStudentDetails(null)
        break
      case 'edit':
        setModalOpen(true)
        setStudentDetails(studentData)
        break
      case 'bulk':
        setBulkOpen(true)
      default:
        break
    }
  }

  // HANDLE COPY
  const handleCopy = () => {
    toast.success('Copied!', {
      position: toast.POSITION.TOP_RIGHT,
    })
  }

  // Options for classes Select component
  const classOptions = allClasses?.map((item) => {
    return { value: item.id, label: item?.classs_room_name }
  })

  // HANDLE DELETE STUDENT
  const handleDelete = async (studentID: string) => {
    const updatedStudents = allStudentsData?.filter((item) => item.student_id !== studentID)
    mutate(updatedStudents, false)
    await deleteStudent(studentID)
    mutate()
    setModalOpen(false)
  }

  // SUBMIT FORM CONDITION
  const handleFormSubmit = async (values: IFormStudent) => {
    values.school_id = String(schoolID)
    let formData = { ...values }
    if (studentDetails) {
      const updatedItems = allStudentsData.map((el) =>
        el.student_id === studentDetails.student_id ? formData : el
      )
      mutate(updatedItems, false)
      await editStudent(studentDetails.student_id, updatedItems)
    } else {
      mutate([...allStudentsData, formData], false)
      await addStudent(formData)
    }
    mutate()
    setModalOpen(false)
  }

  // TABLE HEAD
  const tableHead = [
    'USERNAME',
    'LANGUAGE',
    'STUDENT ID',
    'AGE',
    'GENDER',
    'CLASS',
    'CLASS ARM',
    '',
  ]
  // TABLE BODY
  const TableBody = () => {
    return allStudentsData?.map((item: any) => {
      return (
        <tr key={item.student_id}>
          <td>{item.username}</td>
          <td>{item.language}</td>
          <td>
            <CopyToClipboard text={item.student_id} onCopy={() => handleCopy()}>
              <div className="copyBox">
                {item.student_id}
                <RiFileCopyLine />
              </div>
            </CopyToClipboard>
          </td>
          <td>{item.age}</td>
          <td>{item.gendar}</td>
          <td>{item.class}</td>
          <td>{item.classarm}</td>
          <td>
            <div className="action">
              <AiFillEdit className="editIcon" onClick={() => handleModalOpen('edit', item)} />
              <RiDeleteBin6Line
                className="deleteIcon"
                onClick={() => {
                  window.confirm('Delete this student?') && handleDelete(item.student_id)
                }}
              />
            </div>
          </td>
        </tr>
      )
    })
  }

  return (
    <>
      <div>
        <h3 className="headerTitle">Student Configuration</h3>

        <div className={styles.btnWrap}>
          <Button
            width="150px"
            height="30px"
            size="15px"
            text="Add Student"
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
        <Table head={tableHead} body={TableBody} />
      </div>

      {/* MODAL TO MODIFY USERS */}
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <AddEditStudents
          title={studentDetails ? 'Edit Student' : 'Add Student'}
          schoolID={schoolID}
          handleFormSubmit={handleFormSubmit}
          studentDetails={studentDetails}
          classOptions={classOptions}
        />
      </Modal>

      {/* MODAL TO MODIFY STUDENTS */}
      <Modal open={bulkOpen} setOpen={setBulkOpen}>
        <BulkUpload />
      </Modal>
      <ToastContainer />
    </>
  )
}

export default Student
