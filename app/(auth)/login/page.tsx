'use client'

import React, { useEffect, useState } from 'react'
import LoginForm from '@/components/Form/Forms/Login/LoginForm'
import HomeNavbar from '@/components/Navbar/HomeNavbar/HomeNavbar'
import { getToken, removeToken } from '@/services/api/token'
import Footer from '@/components/Footer/Footer'

const MyLogin = () => {
  const token = getToken()
 
  useEffect(() => {
    if (token) {
      removeToken()
    }
  }, [token])
  return (
    <>
      <HomeNavbar />
      <LoginForm />
      <Footer />
    </>
  )
}

export default MyLogin
