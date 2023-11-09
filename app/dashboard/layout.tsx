'use client'

import React from 'react'
import DashboardNav from '@/components/Navbar/DashboardNavbar/DashboardNavbar'
import Sidebar from '@/components/Sidebar/DashboardSidebar/DashboardSidebar'
import { usePathname } from 'next/navigation'
import { userSurvey } from '@/services/redux/features/surveySlice'
import { BaselineFormStudent } from '@/components/Form/Forms/BaselineForm/BaselineForm'
import { useSelector } from 'react-redux'

interface ChildrenProps {
  children: React.ReactNode
}
const DashboadLayout = ({ children }: ChildrenProps) => {
  const pathname = usePathname()
  const isOnUserPage = pathname === '/dashboard'
  const currentUserSurvey = useSelector(userSurvey)

 
  return (
    <>
      {currentUserSurvey ? (
        <>
          {isOnUserPage ? null : <DashboardNav />}
          <div className={`${isOnUserPage ? null : 'flex'}`}>
            {isOnUserPage ? null : <Sidebar />}
            <div
              style={
                isOnUserPage
                  ? {}
                  : {
                      flex: '8',
                      backgroundColor: 'whitesmoke',
                      padding: '25px 30px',
                      boxSizing: 'border-box',
                      overflow: 'hidden',
                      borderRadius: '20px',
                    }
              }
            >
              {children}
            </div>
          </div>
        </>
      ) : (
        <BaselineFormStudent />
      )}
    </>
  )
}

export default DashboadLayout
