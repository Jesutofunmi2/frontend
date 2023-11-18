import React, { Dispatch, SetStateAction } from 'react'
import Drawer from '../Drawer/Drawer'
import styles from './HomeNavbar/homeNavbar.module.css'
import dashStyles from './DashboardNavbar/dashboardNavbar.module.css'
import { AiOutlineClose } from 'react-icons/ai'
import Image from 'next/image'
import Link from 'next/link'
import { SchoolSidebarMenus, sidebarMenus, teacherSidebarMenus } from '../Sidebar/data'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { BiLogOut } from 'react-icons/bi'
import { TOKEN_KEY } from '@/utils/constants'
import { logout, schoolLogout } from '@/services/redux/features/userSlice'

interface MobileViewProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
export function MobileNavbarViewHome({ open, setOpen }: MobileViewProps) {
  const token = false
  const pathname = usePathname()

  return (
    <>
      <Drawer open={open} setOpen={setOpen}>
        <div className={styles.topWrap}>
          <Image src="/assets/images/logo.png" width="73" height="80" alt="logo" />
          <span>
            <AiOutlineClose
              aria-hidden="true"
              size={25}
              className={styles.closeIcon}
              onClick={() => setOpen(false)}
            />
          </span>
        </div>
        <ul className={styles.menuWrap}>
          {token ? (
            <Link href="/dashboard/languages">
              <li>Dashboard</li>
            </Link>
          ) : (
            <Link href="/login">
              <li>Login</li>
            </Link>
          )}
          <Link href="/about">
            <li>About</li>
          </Link>
          <Link href="">
            <li>Izesan Schools</li>
          </Link>
        </ul>
      </Drawer>
    </>
  )
}

export function MobileNavbarViewDash({ open, setOpen }: MobileViewProps) {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const router = useRouter()
  let currentPage = pathname.split('/')[1]

  let sideBaritems =
    currentPage === 'school'
      ? SchoolSidebarMenus
      : currentPage === 'teacher'
      ? teacherSidebarMenus
      : sidebarMenus

  const handleLogout = () => {
    if (currentPage === 'school') {
      localStorage.removeItem(TOKEN_KEY)
      dispatch(schoolLogout(null))
      router.push('/login')
    } else {
      dispatch(logout(null))
      router.push('/login')
    }
  }

  return (
    <>
      <Drawer position="left" open={open} setOpen={setOpen}>
        <div className={dashStyles.topWrap}>
          <Image src="/assets/images/logo.png" width="73" height="80" alt="logo" />
          <span>
            <AiOutlineClose
              aria-hidden="true"
              size={25}
              className={dashStyles.closeIcon}
              onClick={() => setOpen(false)}
            />
          </span>
        </div>

        <ul className={dashStyles.mobileWrapper}>
          {sideBaritems.map((menu) => (
            <Link href={menu.route} key={menu.id}>
              <li className={pathname == `${menu.route}` ? dashStyles.active : dashStyles.list}>
                <span>{menu.icon}</span> <p>{menu.title}</p>
              </li>
            </Link>
          ))}
        </ul>

        <button
          onClick={() => handleLogout()}
          className="mt-12 text-lg flex items-center gap-3 text-yellow"
        >
          {' '}
          <BiLogOut size={20} /> Logout
        </button>
      </Drawer>
    </>
  )
}
