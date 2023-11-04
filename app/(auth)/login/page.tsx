'use client'

import React, { useEffect } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import LoginForm from '@/components/Form/Forms/Login/LoginForm'
import tree from '/public/assets/images/tree.png'
import HomeNavbar from '@/components/Navbar/HomeNavbar/HomeNavbar'
import { getToken, removeToken } from '@/services/api/token'

const MyLogin = () => {
  const token = getToken()
  useEffect(() => {
    if (token) {
      removeToken()
    }
  }, [token])
  return (
    <>
      <HomeNavbar noFixedNavbar={true} />
      <div className={styles.login}>
        <div className={styles.log}>
          <Image src={tree} className={styles.tree} alt="tree" />
        </div>
        <LoginForm />
      </div>
    </>
  )
}

export default MyLogin
