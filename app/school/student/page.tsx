'use client'

import React, { useState } from 'react'
import Table from '@/components/Table/Table'
import Modal from '@/components/Modal/Modal'
import Button from '@/components/Button/Button'
import AddEditStudents from '@/components/Form/Forms/AddEditStudents/AddEditStudents'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { RiDeleteBin6Line, RiFileCopyLine } from 'react-icons/ri'
import { FiDownload } from 'react-icons/fi'
import { AiFillEdit } from 'react-icons/ai'
import {
  addStudent,
  deleteStudent,
  editStudent,
  downloadStudents,
  useGetStudents,
} from '@/services/api/school/student'
import BulkUpload from '@/components/BulkUpload/BulkUpload'
import { useGetClasses } from '@/services/api/school/class'
import { Loader, Spinner } from '@/components/Loader/Loader'
import { userData } from '@/services/redux/features/userSlice'
import { IFormStudent } from '@/types/student'

import ViewAttachment from '@/components/ViewAttachment/ViewAttachment'

const Student = () => {
  const schoolID = Number(useSelector(userData).currentSchool?.data.id!)
  const [studentDetails, setStudentDetails] = useState<any | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [bulkOpen, setBulkOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [isDownloading, setDownloading] = useState(false)
  const [previewDownload, setPreviewDownload] = useState<any>('')
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

  const handleDownload = async () => {
    if (previewDownload.length) {
      setPreviewOpen(true)
    } else {
      setDownloading(true)
      try {
        let res = await downloadStudents(schoolID)
        setPreviewDownload(res.url)
        setPreviewOpen(true)
        setDownloading(false)
      } catch (error) {
        console.log(error)
        setDownloading(false)
      }
    }
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
  const handleFormSubmit = async (values: IFormStudent | any) => {
    values.school_id = String(schoolID)
    values.age = Number(values.age)
    values.country = 'Nigeria'
    let formData = { ...values }
    if (studentDetails) {
      const updatedItems: any = allStudentsData.map((el) =>
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
    return allStudentsData?.map((item: any, index: number) => {
      return (
        <tr key={index}>
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
        <h3 className="p-4 rounded-xl bg-white text-lg font-bold">Student Configuration</h3>

        <div className="flex item-center mt-8 pt-8 pb-3 justify-between">
          <div className="flex item-center gap-4">
            <Button text="Add Student" handleClick={() => handleModalOpen('add', null)} />
            <Button
              text="Bulk Registration"
              backgroundColor="lightGreen"
              handleClick={() => handleModalOpen('bulk', null)}
            />
          </div>
          <button type="button" className="mr-10" onClick={() => handleDownload()}>
            {' '}
            {isDownloading ? (
              <Spinner />
            ) : (
              <span>
                <FiDownload className="inline ml-2 text-2xl" />
              </span>
            )}
          </button>
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
        <BulkUpload
          schoolID={schoolID}
          mutate={mutate}
          classOptions={classOptions}
          setBulkOpen={setBulkOpen}
        />
      </Modal>

      {previewDownload.length ? (
        <Modal open={previewOpen} setOpen={setPreviewOpen}>
          <ViewAttachment url={previewDownload} />
        </Modal>
      ):null}
      <ToastContainer />
    </>
  )
}

export default Student
