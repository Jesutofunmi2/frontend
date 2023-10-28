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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24
    },
  },
});
const DashboadLayout = ({ children }: ChildrenProps) => {
  return (

      <QueryClientProvider client={queryClient}>
            <SchoolAuthProvider>
        <SchoolNavbar />
        <div className={styles.layout}>
          <Sidebar school="true" />
          <div className={styles.body}>{children}</div>
        </div>
        </SchoolAuthProvider>
      </QueryClientProvider>

  )
}

export default DashboadLayout
