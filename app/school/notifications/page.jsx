import React from 'react'
import styles from "./page.module.css";
import NotificationCard from '@/components/Card/NotificationCard/NotificationCard';

const Notifications = () => {
  return (
    <div>
      <h3>Notifications</h3>

      <div className={styles.cardWrap}>
      <NotificationCard/>
      <NotificationCard/>
      </div>
     
    </div>
  )
}

export default Notifications