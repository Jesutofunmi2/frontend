'use client'

import React, { useState } from 'react'
import styles from './dashboardSidebar.module.css'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { SchoolSidebarMenus, sidebarMenus, teacherSidebarMenus } from '../data'
import { BiLogOut } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { logout, schoolLogout } from '@/services/redux/features/userSlice'
import { surveyStatus } from '@/services/redux/features/surveySlice'
import { TOKEN_KEY } from '@/utils/constants'

interface SidebarProps {
  school?: string
  teacher?: string
}
const Sidebar = ({ school, teacher }: SidebarProps) => {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const router = useRouter()
  const [dropdownOpen, setDropdownOpen] = useState<any>("")

  // Get url path
  const path = pathname.split('/')[2]

  // HANDLE LOGOUT REQUEST
  const handleLogout = () => {
    if (school) {
      localStorage.removeItem(TOKEN_KEY)
      // if on school dashboard clear school auth data from redux store and navigate to login page
      dispatch(schoolLogout(null))
      router.push('/login')
    } else {
      dispatch(logout(null))
      dispatch(surveyStatus(null))
      router.push('/login')
    }
  }

  const handleToggle = (id:number) => {
    if (dropdownOpen === id) {
      setDropdownOpen(false)
    } else {
      setDropdownOpen(id)
    }
  }

  // const toggle = useCallback(() => setIsOpen(prevState =>!prevState), []);

  return (
    <>
      <div className={styles.sidebarContainer}>
        {school ? (
          // SHOW WHEN ON SHOOL DASHBOARD AND "school" prop IS "TRUE"
          <ul>
            {SchoolSidebarMenus.map((menu) => (
              <div key={menu.id}>
                <li
                  className={path == `${menu?.route?.split('/')[2]}` ? styles.active : styles.list}
                  onClick={() =>
                 dropdownOpen === 'true' ? handleToggle(menu.id) : router.push(menu.route)
                  }
                >
                  <span>{menu.icon}</span> <p>{menu.title}</p>
                  {dropdownOpen === 'true' ? (
                    <IoIosArrowDown className={styles.dropIcon} />
                  ) : null}
                </li>

                {/* {dropdownOpen === menu.id && (
                  <>
                    {menu.map((child) => (
                      <Link href={child.route} key={child.id}>
                        <div className={styles.childWrap}>
                          <span>{child.title}</span>
                        </div>
                      </Link>
                    ))}
                  </>
                )} */}
              </div>
            ))}
            <li className={styles.logout} onClick={() => handleLogout()}>
              <span>
                <BiLogOut size={25} />
              </span>
              <p>Logout</p>
            </li>
          </ul>
        ) : teacher ? (
          // SHOW WHEN ON TEACHER DASHBOARD AND IS "TRUE"
          <ul>
            {teacherSidebarMenus.map((menu) => (
              <Link href={menu.route} key={menu.id}>
                <li
                  className={path == `${menu?.route?.split('/')[2]}` ? styles.active : styles.list}
                >
                  <span>{menu.icon}</span> <p>{menu.title}</p>
                </li>
              </Link>
            ))}
            <li className={styles.logout} onClick={() => handleLogout()}>
              <span>
                <BiLogOut size={25} />
              </span>
              <p>Logout</p>
            </li>
          </ul>
        ) : (
          // SHOW WHEN ON USER DASHBOARD
          <ul>
            {sidebarMenus.map((menu) => {
              return (
                <Link href={menu.route} key={menu.id}>
                  <li
                    className={
                      path == `${menu?.route?.split('/')[2]}` ? styles.active : styles.list
                    }
                  >
                    <span>{menu.icon}</span> <p>{menu.title}</p>
                  </li>
                </Link>
              )
            })}
            <li className={styles.logout} onClick={() => handleLogout()}>
              <span>
                <BiLogOut size={25} />
              </span>
              <p>Logout</p>
            </li>
          </ul>
        )}
      </div>
    </>
  )
}

export default Sidebar
