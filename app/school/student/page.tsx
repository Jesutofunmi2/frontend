'use client'

import React, { useEffect, useState } from 'react'
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
  useEditStudent,
  useGetStudents,
} from '@/services/old-apis/student'
import BulkUpload from '@/components/BulkUpload/BulkUpload'
import { getClassArmById, useGetClasses } from '@/services/old-apis/class'
import { Loader } from '@/components/Loader/Loader'
import { userData } from '@/services/redux/features/userSlice'
import { IStudent } from '@/types'

import { IClass } from '@/types/class'
import { IAddStudentRequest } from '@/types/student'

interface Options {
  label: string
  value: IClass
}
const Student = () => {
  const schoolID = useSelector(userData).currentSchool?.data.id!

  const [studentDetails, setStudentDetails] = useState<IStudent | null>(null)
  const [selectedOptionForClass, setSelectedOptionForClass] = useState<IClass>()
  const [selectedOptionForClassArm, setSelectedOptionForClassArm] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [bulkOpen, setBulkOpen] = useState(false)
  // const { trigger: deleteStudent } = useDeleteStudent(mutate)
  // const { trigger: addStudent } = useAddStudent(mutate, setModalOpen)
  // const { trigger: editStudent } = useEditStudent(mutate, setModalOpen)
  const { data: allClasses } = useGetClasses(schoolID)
  // const { data: allClassArmByID } = useGetClassArmById(schoolID, selectedOptionForClass?.id)
  const [allClassArmByID, setClassArmByID] = useState<IClass[]>([])
  const [payloadData, setPayloadData] = useState<IAddStudentRequest | any>({
    school_id: `${schoolID}`,
    first_name: '',
    last_name: '',
    language: '',
    age: 0,
    gendar: '',
    country: 'Nigeria',
    class_id: 0,
    classarm_id: '',
    term: '',
    session: '',
  })

  useEffect(() => {
    if (selectedOptionForClass) {
      const fetchData = async () => {
        try {
          let response = await getClassArmById(schoolID, selectedOptionForClass.id)
          setPayloadData((payloadData: IAddStudentRequest) => ({
            ...payloadData,
            class_id: selectedOptionForClass.id,
          }))
          setClassArmByID(response)
        } catch (error) {
          console.error(error)
        }
      }
      fetchData()
    }
  }, [schoolID, selectedOptionForClass])

  const { error, data: allStudentsData, isLoading, mutate } = useGetStudents(schoolID)
  if (!allStudentsData) return null
  if (isLoading) return <Loader />
  if (error) return <p>error page</p>
  // const validation = () => {
  //   for (const key in payloadData) {
  //     if (payloadData[key] === '') {
  //       return true
  //     }
  //   }
  // }
  // OPEN MODAL CONDITION
  const handleModalOpen = (modalEvent: string, data: IStudent | null) => {
    switch (modalEvent) {
      case 'add':
        setModalOpen(true)
        setStudentDetails(null)
        break
      case 'edit':
        setModalOpen(true)
        setStudentDetails(data)
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
    return { value: item, label: item?.classs_room_name }
  })

  const classArmoptions = allClassArmByID[0]?.class_arms.map(
    (item: { id: number; name: string }) => {
      return { label: item?.name, value: item.id }
    }
  )

  // HANDLE DELETE STUDENT
  const handleDelete = (studentID: number) => {
    const updated = allStudentsData?.filter((item) => item.id !== studentID)
    mutate(updated, false)
    deleteStudent(studentID)
  }

  // Remove school_id from payload data. school_id is not required in edit.
  const { school_id, ...newPayload } = payloadData

  // SUBMIT FORM CONDITION
  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    mutate([...allStudentsData, payloadData], false)
    let response = await addStudent(payloadData)
    if (response) {
      mutate()
      setModalOpen(false)
    }
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
    return allStudentsData?.map((item: IStudent) => {
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
          payloadData={payloadData}
          setPayloadData={setPayloadData}
          handleSubmit={handleSubmit}
          studentDetails={studentDetails}
          classOptions={classOptions}
          classArmoptions={classArmoptions}
          setSelectedOptionForClass={setSelectedOptionForClass}
          selectedOptionForClass={selectedOptionForClass}
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
