'use client'
import React, { useEffect } from 'react'
import styles from './page.module.css'
import Sidebar from '@/components/Sidebar/DashboardSidebar/DashboardSidebar'
import SchoolNavbar from '@/components/Navbar/SchoolNavbar/SchoolNavbar'
import { getToken } from '@/services/api/token'
import { useRouter } from 'next/navigation'

interface ChildrenProps {
  children: React.ReactNode
}

const DashboadLayout = ({ children }: ChildrenProps) => {
  const token = getToken()
  const router = useRouter()
  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])
  return (
    <>
      <SchoolNavbar />
      <div className={styles.layout}>
        <Sidebar school="true" />
        <div className="px-4 py-8 md:p-8 bg-gray-300 grow">{children}</div>
      </div>
    </>
  )
}

export default DashboadLayout
