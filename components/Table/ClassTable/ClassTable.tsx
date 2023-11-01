import React, { useState } from 'react'
import styles from './classTable.module.css'
import { BsArrowDown, BsArrowDownUp, BsArrowUp } from 'react-icons/bs'
import { RiArrowDownSLine, RiDeleteBin6Line } from 'react-icons/ri'
import { ClassArmPayload } from '@/types/classarm'
import { deleteClass } from '@/services/api/school/class'

const DummyData = [
  { id: 1, name: 'kohn', age: 30, city: 'New York' },
  { id: 2, name: 'zane', age: 25, city: 'Los Angeles' },
  { id: 3, name: 'Bob', age: 35, city: 'Chicago' },
  { id: 4, name: 'Alice', age: 28, city: 'San Francisco' },
]
interface ClassTableProps {
  body?: any
  mutate: any
  schoolID: number
  setClassArmOpen: React.Dispatch<React.SetStateAction<ClassArmPayload | null | any>>
  setOpenClassArm: React.Dispatch<React.SetStateAction<boolean>>
}

const ClassTable = ({
  body,
  schoolID,
  setClassArmOpen,
  mutate,
  setOpenClassArm,
}: ClassTableProps) => {
  const [data, setData] = useState(DummyData)
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('ascending')
  const [filterText, setFilterText] = useState('')
  const [isActive, setActive] = useState({ id: 0, status: false })

  const handleSort = (key: any) => {
    if (sortBy === key) {
      setData([...data].reverse())
      // Toggle sorting order or disable sorting
      if (sortOrder === 'ascending') {
        setSortOrder('descending')
      } else if (sortOrder === 'descending') {
        setSortOrder('')
        setData(DummyData)
      } else {
        setSortOrder('ascending')
      }
    } else {
      setData([...data].sort((a, b) => (a[key] < b[key] ? -1 : 1)))
      setSortBy(key)
      setSortOrder('ascending')
    }
  }

  // const handleFilter = (e) => {
  //   const text = e.target.value
  //   setFilterText(text)

  //   const filteredData = DummyData.filter((item) =>
  //     item.name.toLowerCase().includes(text.toLowerCase())
  //   )
  //   setData(filteredData)
  // }

  const getSortLabel = (key: string | null) => {
    if (sortBy === key) {
      return sortOrder === 'ascending' ? (
        <BsArrowUp />
      ) : sortOrder === 'descending' ? (
        <BsArrowDown />
      ) : (
        <BsArrowDownUp />
      )
    }
    return ''
  }

  const handleOpen = (id: number) => {
    setActive({
      id: id,
      status: true,
    })
    if (isActive.id === id && isActive.status) {
      setActive({
        id: id,
        status: false,
      })
    }
  }

  const handleDeleteClass = async (class_id: number) => {
let res =await deleteClass(schoolID, class_id)
    if(res){
      mutate()
    }
  
  }
  return (
    <>
      <div className={styles.container}>
        <table>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th></th>
              <th></th>
              <th>No.</th>
              <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                Class {getSortLabel('name') || <BsArrowDownUp />}
              </th>
              <th className={styles.STATUS}>Language</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {body?.map((item: any, index: number) => (
              <React.Fragment key={index}>
                <tr className={styles.compMain} onClick={() => handleOpen(item?.id)}>
                  <td>
                    <RiArrowDownSLine
                      className={`${styles.compArrow} ${
                        isActive.id === index && styles.arrowRotate
                      }`}
                    />
                  </td>
                  <td></td>
                  <td> {index + 1}</td>
                  <td>{item.classs_room_name}</td>
                  <td>{item.language}</td>

                  <td>
                    <button
                      onClick={(e) => {
                        window.confirm('Delete competition?') && handleDeleteClass(item.id)
                      }}
                      className={styles.compUdButtonsWrap}
                    >
                      <RiDeleteBin6Line
                        className={styles.compUdButtons}
                        style={{ color: 'tomato' }}
                      />
                    </button>
                  </td>
                </tr>
                {isActive.id === item.id && isActive.status && (
                  <>
                    <tr className={styles.compMB}>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className={styles.compBlue}>Class arm</td>
                      <td className={styles.compBlue}></td>
                      <td>
                        <button
                          className={styles.compudButtons}
                          onClick={() => {
                            setClassArmOpen({
                              class_id: item.id,
                              language_id: item.language_id,
                            }),
                              setOpenClassArm(true)
                          }}
                        >
                          Add class arm
                        </button>
                      </td>
                    </tr>
                    {item?.class_arms.map((item2: any, idx: any) => (
                      <tr className={styles.compMB} key={item2.id}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{item2?.name}</td>
                        <td></td>
                        <td></td>
                      </tr>
                    ))}
                  </>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ClassTable
