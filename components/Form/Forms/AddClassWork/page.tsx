'use client'

import React from 'react'
import styles from './page.module.css'
import Tab2 from '@/components/Tab/Tab2/Tab2'
import AssignClassworkView from '@/components/Views/AssignClassworkView/AssignClassworkView'
import AssignModuleView from '@/components/Views/AssignModuleView/AssignModuleView'

const tabData = [
  { id: 1, title: 'Assign Classwork' },
  { id: 2, title: 'Assign Module' },
]

interface AddClassworkPageProps {
  toggle: string
 
  handleToggle: (toggle: string) => void
  handleFormSubmit: (data: any, reset: () => void) => void
  handleModuleSubmit: (
 
    data: { module: ''; data: { deadline: string; attempts: ''; time: ''; mark: '' }[] },
    reset: (value: any) => void
  ) => void
}
const AddClassworkPage = ({

  toggle,
  handleToggle,
  handleFormSubmit,
  handleModuleSubmit,
}: AddClassworkPageProps) => {
  return (
    <>
      <div>
        <div className={styles.body}>
          <div className={styles.tabWrap}>
            <Tab2 handleToggle={handleToggle} data={tabData} toggle={toggle} />
          </div>
          {toggle === 'Assign Classwork' ? (
            <AssignClassworkView handleFormSubmit={handleFormSubmit} />
          ) : (
            <AssignModuleView  handleModuleSubmit={handleModuleSubmit} />
          )}
        </div>
      </div>
    </>
  )
}

export default AddClassworkPage
