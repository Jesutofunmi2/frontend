import React from 'react'
import styles from './modulesSection.module.css'
import { Spinner } from '@/components/Loader/Loader'
import AssignCard from '@/components/Card/AssignCard/AssignCard'
import { Lesson } from '@/types/lessontopic'

interface ModulesSectionProps {
  selectModule: []
  setselectModule: React.Dispatch<React.SetStateAction<never[]>>
  data: Lesson[]
  isValidating: boolean
}
const ModulesSection = ({
  selectModule,
  setselectModule,
  data,
  isValidating,
}: ModulesSectionProps) => {
  // const handleClick = (param) => {
  //   const alreadyExisting = selectModule.find((item) => item.id === param.id)
  //   if (alreadyExisting) {
  //     setselectModule((current) => current.filter((fruit) => fruit.id !== param.id))
  //   } else {
  //     setselectModule((current) => [...current, param])
  //   }
  // }

  return (
    <>
      {/* <div className={styles.cardWrap}>
        {data?.map((item) => {
          let selected = selectModule.find((e) => e?.id === item.id)
          return (
            // <AssignCard item={item} selected={selected} handleClick={handleClick} key={item.id} />
          )
        })}
        {isValidating ? <Spinner /> : null}
      </div> */}
    </>
  )
}

export default ModulesSection
