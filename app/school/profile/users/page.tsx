'use client'

import React, { useState } from 'react'
import styles from './page.module.css'
import Table from '@/components/Table/Table'
import Modal from '@/components/Modal/Modal'
import Button from '@/components/Button/Button'
import AddEditUsers from '@/components/Form/Forms/AddEditUsers/AddEditUsers'

const Users = () => {
  const [open, setOpen] = useState(false)

  const handleModalOpen = () => [setOpen(true)]

  return (
    <>
      <div>
        <div className={styles.btnWrap}>
          <Button
            
            text="Add User"
            handleClick={() => handleModalOpen()}
          />
        </div>
        <Table />
      </div>
      <Modal open={open} setOpen={setOpen}>
        <AddEditUsers />
      </Modal>
    </>
  )
}

export default Users
