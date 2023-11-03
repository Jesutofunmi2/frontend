import React from 'react'
import styles from './tab1.module.css'

interface TabProps {
  tabData: any
  handleActiveTab: (activeTab: 'Students' | 'Classwork' | 'Assignment' | 'Gradebook') => void
  activeTab: string
}
const Tab1 = ({ tabData, activeTab, handleActiveTab }: TabProps) => {
  const handleClick = (selectedTab: 'Students' | 'Classwork' | 'Assignment' | 'Gradebook') => {
    handleActiveTab(selectedTab)
  }

  return (
    <>
      <div className={styles.container}>
        {tabData?.map((item:any) => (
          <div
            className={activeTab === item.text ? styles.active : styles.card}
            key={item.text}
            onClick={() => handleClick(item.text)}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </>
  )
}
export default Tab1
