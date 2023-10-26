'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Router from "next/router";
interface ChildrenProps {
  children: React.ReactNode
}

const SchoolAuthProvider = ({ children }: ChildrenProps) => {
  const [auth, setAuth] = useState(false)

  const token = useSelector((state) => state?.user?.currentSchool?.token?.token)

  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push('/login')
      // Router.push('/login');  
    } else {
      setAuth(true)
    }
  }, [token])

  return <div>{auth ? children : null}</div>

  // switch(token) {
  //   case !token:
  //      router.push("/login")
  //   case token:
  //     return <><div>{children}</div></>
  //   default:
  //     return null
  // }
}

export default SchoolAuthProvider
