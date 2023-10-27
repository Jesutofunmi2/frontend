'use client'
import React from 'react'
import styles from './page.module.css'
import Sidebar from '@/components/Sidebar/DashboardSidebar/DashboardSidebar'
import SchoolNavbar from '@/components/Navbar/SchoolNavbar/SchoolNavbar'
import SchoolAuthProvider from '@/Providers/schoolAuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface ChildrenProps {
  children: React.ReactNode
}

const queryClient = new QueryClient()
const DashboadLayout = ({ children }: ChildrenProps) => {
  return (
    <SchoolAuthProvider>
      <QueryClientProvider client={queryClient}>
        <SchoolNavbar />
        <div className={styles.layout}>
          <Sidebar school="true" />
          <div className={styles.body}>{children}</div>
        </div>
      </QueryClientProvider>
    </SchoolAuthProvider>
  )
}

export default DashboadLayout
