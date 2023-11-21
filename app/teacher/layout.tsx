'use client'

import React, { ReactNode, useEffect } from 'react'
import SchoolNavbar from '@/components/Navbar/Navbar/Navbar'
import Sidebar from '@/components/Sidebar/DashboardSidebar/DashboardSidebar'
import { getToken } from '@/services/api/token'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { BaselineFormTeacher } from '@/components/Form/Forms/BaselineForm/BaselineForm'
import { userSurvey } from '@/services/redux/features/surveySlice'
import Navbar from '@/components/Navbar/Navbar/Navbar'

interface ChildrenProps {
  children: ReactNode
}
const TeacherDashboardLayout = ({ children }: ChildrenProps) => {
  const currentUserSurvey = useSelector(userSurvey)

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
      {currentUserSurvey ? (
        <>
          <Navbar />
          <div className="layout">
            <Sidebar teacher="true" />
            <div className="px-4 py-8 h-screen overflow-x-hidden md:p-8 bg-gray-300 grow">{children}</div>
          </div>
        </>
      ) : (
        <BaselineFormTeacher />
      )}
    </>
  )
}

export default TeacherDashboardLayout
