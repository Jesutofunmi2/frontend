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

const Teacher = () => {
  const schoolID = useSelector(userData).currentSchool?.data.id!
  const [teacherDetails, setTeacherDetails] = useState<ITeacher | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [bulkOpen, setBulkOpen] = useState(false)
  const [file, setFile] = useState<File | string>('')

  const [payloadData, setPayloadData] = useState<IPayloadTeacher>({
    image_url: '',
    school_id: `${schoolID}`,
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

  // HANDLE COPY
  const handleCopy = () => {
    toast.success('Copied!', {
      position: toast.POSITION.TOP_RIGHT,
    })
  }

  // HANDLE DELETE STUDENT
  const handleDelete = (teacherID: string) => {
    deleteTeacher(teacherID)
  }

  // SUBMIT FORM CONDITION
  const handleFormSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (typeof file === 'string' && file.length === 0) {
      toast.error('Upload image', {
        position: toast.POSITION.TOP_RIGHT,
      })
      return
    }
    console.log(file)

    if (teacherDetails) {
      // editTeacher({
      //   image_url: file,
      //   name: payloadData.name,
      //   email: payloadData.email,
      //   address: 'bosss',
      //   teacher_id: teacherDetails.teacher_id,
      //   school_id: payloadData.school_id,
      // })
    } else {
      // const formData = new FormData()
      // formData.append('image_url', file)
      // formData.append('school_id', payloadData.school_id)
      // formData.append('name', payloadData.name)
      // formData.append('email', payloadData.email)
      // formData.append('address', 'bosss')

      const formData = {
        image_url: file.name,
        school_id: payloadData.school_id,
        name: payloadData.name,
        email: payloadData.email,
        address: 'bosss',
      }
      console.log(formData)
      // mutate([...allTeachersData, formData], false)
      // await addTeacher(formData)
    }
    mutate()
    setModalOpen(false)
  }

  // HANDLE SEARCH
  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const filtered = teacherData?.data?.filter((item: ITeacher) => {
  //     return (
  //       item.email.toLowerCase().includes(e.target.value) ||
  //       item.name.toLowerCase().includes(e.target.value)
  //     )
  //   })

  //   if (filtered) {
  //     setFilteredData(filtered)
  //   } else {
  //   }
  // }

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
        <h3 className="headerTitle">Teacher Configuration</h3>
        <div className={styles.actions}>
          <div className={styles.btnWrap}>
            <Button
              width="150px"
              height="30px"
              size="15px"
              text="Add Teacher"
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

export default Teacher
