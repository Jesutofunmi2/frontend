import React from 'react'
import styles from './classworkView.module.css'
import Button from '../../Button/Button'
import ClassworkCard from '../../Card/ClassworkCard/ClassworkCard'
import Link from 'next/link'
import AssignModuleCard from '@/components/Card/AssignModuleCard/AssignModuleCard'
// import { useDeleteClasswork, useGetClasswork } from '@/services/APIs/classwork'
import { useSearchParams } from 'next/navigation'
import { Loader } from '@/components/Loader/Loader'
import { deleteModule, useGetAssignedModule } from '@/services/api/module'

interface ClassWorkProps {
  classworkData: any
  handleDeleteClasswork: (param: any) => void
  teacher_id: number
  school_id: number
}

const ClassworkView = ({
  classworkData,
  handleDeleteClasswork,
  school_id,
  teacher_id,
}: ClassWorkProps) => {
  const searchParams = useSearchParams()
  const classID = searchParams.get('id')

  const { data: assignedModule, mutate } = useGetAssignedModule({
    school_id: `${school_id}`,
    teacher_id: `${teacher_id}`,
  })
 
  const handleModuleDelete = async (id: number) => {
    let payload = {
      schoolID: school_id,
      teacherID: teacher_id,
      id: id,
    }
    let res = await deleteModule(payload)
    if (res) {
      mutate()
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.buttonWrap}>
          <Link
            href={{
              pathname: `/teacher/class/classroom/add-classwork`,
              query: {
                id: classID,
              },
            }}
          >
            <Button text="Add Classwork" width="200px" />
          </Link>
        </div>

        <div className={styles.cardWrap}>
          <p className={styles.cardTitle}>CLASSWORK:</p>
          <div className={styles.cards}>
            {classworkData?.length ? (
              classworkData?.map((item: any) => (
                <ClassworkCard
                  data={item}
                  key={item.id}
                  handleDeleteClasswork={handleDeleteClasswork}
                />
              ))
            ) : classworkData?.length === 0 ? (
              <span className={styles.noItem}>No Classwork</span>
            ) : (
              <Loader />
            )}
          </div>
        </div>

        <div className={styles.cardWrap}>
          <p className={styles.cardTitle}>MODULE CLASSWORK:</p>
          <div className={styles.cards}>
            {assignedModule?.length ? (
              assignedModule?.map((module: any) => (
                <AssignModuleCard
                  title={module.title}
                  module={module}
                  key={module.id}
                  handleModuleDelete={handleModuleDelete}
                />
              ))
            ) : assignedModule?.length === 0 ? (
              <span className={styles.noItem}>No Module</span>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ClassworkView
