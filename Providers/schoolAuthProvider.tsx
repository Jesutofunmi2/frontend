'use client'

import { getToken } from '@/services/api/token'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
interface ChildrenProps {
  children: React.ReactNode
}

const SchoolAuthProvider = ({ children }: ChildrenProps) => {
  const [auth, setAuth] = useState(false)
  const token = getToken()
  const router = useRouter()
  useEffect(() => {
    if (!token) {
      router.push('/login')
    } else {
      setAuth(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return <div>{auth ? children : null}</div>
}

export default SchoolAuthProvider
