import React from 'react'
import styles from "./notFound.module.css"

const NotFound = ({text}) => {
  return (
    <>
    <div className={styles.notfound}>
        <p>{text ? text : "No result found:("}</p>
    </div>
    </>
  )
}

export default NotFound