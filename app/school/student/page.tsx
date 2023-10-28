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
// import {
//   useAddStudent,
//   useDeleteStudent,
//   useEditStudent,
//   useGetStudents,
// } from '@/services/old-apis/student'
import BulkUpload from '@/components/BulkUpload/BulkUpload'
// import { useGetClassArmById, useGetClasses } from '@/services/old-apis/class'
import { Loader } from '@/components/Loader/Loader'
import { userData } from '@/services/redux/features/userSlice'
import { IStudent } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { getStudents } from '@/services/Apis/school/student'

const Student = () => {
  const schoolID = useSelector(userData).currentSchool?.data.id!
  // const { mutate, data:studentData, isLoading } = useGetStudents(schoolID)
  const [studentDetails, setStudentDetails] = useState<IStudent | null>(null)
  const [selectedOptionForClass, setSelectedOptionForClass] = useState()
  // const [selectedOptionForClassArm, setSelectedOptionForClassArm] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [bulkOpen, setBulkOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [studentsData, setStudentsData] = useState<IStudent[] | null>(null)
  // const { trigger: deleteStudent } = useDeleteStudent(mutate)
  // const { trigger: addStudent } = useAddStudent(mutate, setModalOpen)
  // const { trigger: editStudent } = useEditStudent(mutate, setModalOpen)
  // const { data: allClasses } = useGetClasses(schoolID)
  // const { data: allClassArmByID } = useGetClassArmById(schoolID, selectedOptionForClass?.id)
  const [payloadData, setPayloadData] = useState({
    school_id: `${schoolID}`,
    first_name: '',
    last_name: '',
    language: '',
    age: '',
    gendar: '',
    country: 'Nigeria',
    classarm_id: '',
    term: '',
    session: '',
  })
  // const {
  //   data: allStudentsData,
  //   error,
  //   isLoading,
  // } = useQuery<IStudent[], Error>({
  //   queryKey: ['teachers', schoolID],
  //   queryFn: () => getStudents(schoolID),
  //   initialData: [],
  //   //  staleTime: 10000,

  // })
git
  useEffect(() => {
    fetchData(schoolID) 
  },[studentsData])

  if (isLoading ) {
    return <Loader />
  }

  
  console.log(studentsData)
  // if (error) return 'An error has occurred: ' + error.message
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

  // console.log(selectedOptionForClassArm)

  // useEffect(() => {
  //   setSelectedOptionForClassArm(null)
  // }, [selectedOptionForClass])

  // HANDLE COPY
  const handleCopy = () => {
    toast.success('Copied!', {
      position: toast.POSITION.TOP_RIGHT,
    })
  }

  // Options for classes Select component
  // const classOptions = allClasses?.data?.map((item) => {
  //   return { value: item, label: item?.classs_room_name }
  // })

  // Options for class arm Select component
  // const classArmoptions = allClassArmByID?.data[0]?.class_arms?.map((item) => {
  //   return { value: item.id, label: item?.name }
  // })

  // HANDLE DELETE STUDENT
  const handleDelete = (studentID: string) => {
    deleteStudent(studentID)
  }

  // Remove school_id from payload data. school_id is not required in edit.
  const { school_id, ...newPayload } = payloadData

  // SUBMIT FORM CONDITION
  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()

    // if (!validation() && selectedOptionForClassArm && selectedOptionForClass) {
    console.log()

    if (studentDetails) {
      editStudent({
        first_name: payloadData?.first_name,
        last_name: payloadData?.last_name,
        language: payloadData?.language,
        age: payloadData?.age,
        gendar: payloadData?.gendar,
        country: payloadData?.country,
        class_id: selectedOptionForClass,
        classarm_id: payloadData.classarm_id,
        id: studentDetails?.student_id,
        term: payloadData.term,
        session: payloadData.session,
      })
    } else {
      addStudent({
        school_id: `${payloadData?.school_id}`,
        first_name: payloadData?.first_name,
        last_name: payloadData?.last_name,
        language: payloadData?.language,
        age: payloadData?.age,
        gendar: payloadData?.gendar,
        country: `${payloadData?.country}`,
        // class_id: selectedOptionForClass?.id,
        classarm_id: payloadData.classarm_id,
        term: payloadData.term,
        session: payloadData.session,
      })
    }
    // }else{
    //   alert("work dey")
    // }
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
    return studentsData?.map((item: IStudent) => {
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
        {/* <AddEditStudents
          title={studentDetails ? 'Edit Student' : 'Add Student'}
          payloadData={payloadData}
          setPayloadData={setPayloadData}
          handleSubmit={handleSubmit}
          studentDetails={studentDetails}
          classData={classOptions}
          classArmData={classArmoptions}
          setSelectedOptionForClass={setSelectedOptionForClass}
          selectedOptionForClass={selectedOptionForClass}
          setSelectedOptionForClassArm={setSelectedOptionForClassArm}
          selectedOptionForClassArm={selectedOptionForClassArm}
        /> */}
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
