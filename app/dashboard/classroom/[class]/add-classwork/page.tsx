'use client'

import React, { useState } from 'react'
import styles from './page.module.css'

import Image from 'next/image'
import BackNavigation from '@/components/BackNavigation/BackNavigation'
import Button from '@/components/Button/Button'

import Modal from '@/components/Modal/Modal'
import { Spinner } from '@/components/Loader/Loader'
import Tab2 from '@/components/Tab/Tab2/Tab2'
import AssignClassworkView from '@/components/Views/AssignClassworkView/AssignClassworkView'
import AssignModuleView from '@/components/Views/AssignModuleView/AssignModuleView'
import AddModuleForm from '@/components/Form/Forms/AddModuleForm/AddModuleForm'

const tabData = [
  { id: 1, title: 'Assign Classwork' },
  { id: 2, title: 'Assign Module' },
]

const AddClassworkPage = () => {
  const [selectModule, setselectModule] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  const [toggle, setToggle] = useState('Assign Classwork')
  const [payloadData, setPayloadData] = useState({
    first_name: '',
    gendar: '',
  })

  // const handleModal = () => {
  //   setModalOpen(true);
  // };

  // TOGGLE USERS
  const handleToggle = (title: string) => {
    setToggle(title)
  }
  const handleFormSubmit = () => {}
  return (
    <>
      <div>
        <BackNavigation />
        <h3 className="headerTitle">Add Classwork</h3>

        <div className={styles.body}>
          <div className={styles.tabWrap}>
            <Tab2 handleToggle={handleToggle} data={tabData} toggle={toggle} />
          </div>

          {/* {toggle === 'Assign Classwork' ? (
            <AssignClassworkView handleFormSubmit={handleFormSubmit} />
          ) : (
            <AssignModuleView
            // language={language}
            //     isValidating={isValidating}
            //     setselectModule={setselectModule}
            //     selectModule={selectModule}
            />
          )} */}

          {/* <Button handleClick={handleModal} /> */}
        </div>
      </div>
      {/* MODAL TO MODIFY STUDENTS */}
      {/* <Modal open={modalOpen} setOpen={setModalOpen}>
        <AddModuleForm
          // payloadData={payloadData}
          // setPayloadData={setPayloadData}
          // selectModule={selectModule}
        />
      </Modal> */}
    </>
  )
}

export default AddClassworkPage
