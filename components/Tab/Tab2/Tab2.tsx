import React from 'react'
import styles from './tab2.module.css'

interface TabProps {
  handleToggle: (title:string) => void
  data: any
  toggle: any
}

const Tab2 = ({ handleToggle, data, toggle }: TabProps) => {
  return (
    <>
      <div className={styles.container}>
        {data.map((item:any) => (
          <button
            className={toggle === item.title ? styles.btnActive : styles.btn}
            onClick={() => handleToggle(item.title)}
            key={item.id}
          >
            {item.title}
          </button>
        ))}
      </div>
    </>
  )
}

export default Tab2
