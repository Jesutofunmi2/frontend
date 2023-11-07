'use client'

import React from 'react'
import Sidebar from '@/components/Sidebar/DashboardSidebar/DashboardSidebar'
import SchoolNavbar from '@/components/Navbar/SchoolNavbar/SchoolNavbar'

const TeacherLayoutProvider = ({ children }) => {
  return (
    <>
      <SchoolNavbar />
      <div className="layout">
        <Sidebar teacher="true" />
        <div className="main">{children}</div>
      </div>
    </>
  )
}

export default TeacherLayoutProvider
