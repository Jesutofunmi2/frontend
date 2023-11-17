'use client'

import React, { useState } from 'react'
import styles from './page.module.css'
import Table from '@/components/Table/Table'
import Modal from '@/components/Modal/Modal'
import Button from '@/components/Button/Button'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiFillEdit } from 'react-icons/ai'
import AddEditTeachers from '@/components/Form/Forms/AddEditTeachers/AddEditTeachers'
import {
  addTeacher,
  deleteTeacher,
  editTeacher,
  useGetTeachers,
} from '@/services/api/school/teacher'
import Image from 'next/image'
import BulkUpload from '@/components/BulkUpload/BulkUpload'
import { Loader } from '@/components/Loader/Loader'
import { userData } from '@/services/redux/features/userSlice'
import { ITeacher, IPayloadTeacher } from '@/types/teacher'
import { useGetClasses } from '@/services/api/school/class'

const Teacher = () => {
  const schoolID = Number(useSelector(userData).currentSchool?.data.id)!
  const [teacherDetails, setTeacherDetails] = useState<ITeacher | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [bulkOpen, setBulkOpen] = useState(false)
  const [file, setFile] = useState<File | null | any>(null)
  const { data: allClasses } = useGetClasses(schoolID)
  const [payloadData, setPayloadData] = useState<IPayloadTeacher>({
    image_url: '',
    school_id: schoolID,
    name: '',
    email: '',
    address: 'bosss',
  })

  const { data: allTeachersData, isLoading, error, mutate } = useGetTeachers(schoolID)
  if (!allTeachersData) return null
  if (isLoading) return <Loader />
  if (error) return <p>error page</p>

  const handleModalOpen = (modalEvent: string, data: ITeacher | null) => {
    switch (modalEvent) {
      case 'add':
        setModalOpen(true)
        setTeacherDetails(null)
        break
      case 'edit':
        setModalOpen(true)
        setTeacherDetails(data)
        break
      case 'bulk':
        setBulkOpen(true)
      default:
        break
    }
  }
  // Options for classes Select component
  const classOptions = allClasses?.map((item) => {
    return { value: item.id, label: item?.classs_room_name }
  })

  // HANDLE COPY
  const handleCopy = () => {
    toast.success('Copied!', {
      position: toast.POSITION.TOP_RIGHT,
    })
  }

  // HANDLE DELETE STUDENT
  const handleDelete = async (teacherID: string) => {
    let res = await deleteTeacher(teacherID)
    if (res) {
      mutate()
    }
  }

  // SUBMIT FORM CONDITION
  const handleFormSubmit = async (values: any, selectedClassAndArm: any, reset: () => void) => {
    // if (file === null) {
    //   toast.error('Upload image', {
    //     position: toast.POSITION.TOP_RIGHT,
    //   })
    //   return
    // } else {
    if (teacherDetails) {
    } else {
      const classAndClassArmdata = selectedClassAndArm?.map((item: any) => {
        return { class_id: item.class_id, classarm_id: item.class_arm_id }
      })

      const formData = {
        image_url: 'https://course-material-dev.s3.us-east-2.amazonaws.com/logoi.png', //values.image"_url,
        school_id: schoolID,
        name: values.name,
        email: values.email,
        address: values.address,
        data: classAndClassArmdata,
      }
      const res = await addTeacher(formData)
      if (res) {
        mutate()
      }
    }
    setModalOpen(false)
    reset()
  }

  // TABLE HEAD
  const tableHeading = ['', 'NAME', 'EMAIL', 'TEACHER ID', '']

  // TABLE BODY
  const tableBody = () => {
    const body = allTeachersData?.map((item: ITeacher) => {
      return (
        <tr key={item.teacher_id}>
          <td>
            <Image src="/assets/images/logo.png" width={50} height={50} alt="logo" />
          </td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.teacher_id}</td>
          <td>
            <div className="action">
              <AiFillEdit className="editIcon" onClick={() => handleModalOpen('edit', item)} />
              <RiDeleteBin6Line
                className="deleteIcon"
                onClick={() => {
                  window.confirm('Delete this teacher?') && handleDelete(item.teacher_id)
                }}
              />
            </div>
          </td>
        </tr>
      )
    })

    return body
  }

  return (
    <>
      <div>
        <h3 className="p-4 rounded-xl bg-white text-lg font-bold">Teacher Configuration</h3>
        <div className={styles.actions}>
          <div className={styles.btnWrap}>
            <Button text="Add Teacher" handleClick={() => handleModalOpen('add', null)} />
            <Button
              text="Bulk Registration"
              disabled
            />
          </div>
        </div>

        <Table head={tableHeading} body={tableBody} />
      </div>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <AddEditTeachers
          title={teacherDetails ? 'Edit Teacher' : 'Add Teacher'}
          payloadData={payloadData}
          setPayloadData={setPayloadData}
          handleFormSubmit={handleFormSubmit}
          teacherDetails={teacherDetails}
          setFile={setFile}
          file={file}
          classOptions={classOptions}
          schoolID={schoolID}
        />
      </Modal>
      {/* MODAL TO MODIFY STUDENTS */}
      {/* <Modal open={bulkOpen} setOpen={setBulkOpen}>
        <BulkUpload />
      </Modal> */}
      <ToastContainer />
    </>
  )
}

export default Teacher
