import React from 'react'
import styles from './notFound.module.css'

interface NotFoundProps {
  text: string
}
const NotFound = ({ text }: NotFoundProps) => {
  return (
    <>
      <div className={styles.notfound}>
        <p className="text-base text-error">{text ? text : 'No result found:('}</p>
      </div>
    </>
  )
}

export default NotFound
