import React from 'react'

import styles from './table.module.css'
import Button from '../Button/Button'
import { AiFillEdit } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'

interface TableProps {
  head?: string[]
  body?: any
}

const Table = ({
  head,
  body,
} 
: TableProps) => {
  return (
    <div className={styles.container}>
      <table>
        <thead className={styles.thead}>
          <tr className={styles.tr}>{head?.map((item, index) => <th key={index}>{item}</th>)}</tr>
        </thead>

        <tbody className={styles.tbody}>
          {body ? (
            body()
          ) : null
          }
        </tbody>
      </table>
      {/* <Pagination
        data={data}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        numberOfData={numberOfData}
        pageSize={pageSize}
      /> */}
    </div>
  )
}

export default Table
