import { FaLanguage } from 'react-icons/fa'

const id = Math.random()

export const sidebarMenus = [
  {
    icon: <FaLanguage size={30} />,
    title: 'Learning',
    route: '/dashboard/languages',
    id: Math.random(),
  },
  {
    icon: <FaLanguage size={30} />,
    title: 'Video Course',
    route: '/dashboard/video-course',
    id: Math.random(),
  },
  // {
  //   icon: <FaLanguage size={30} />,
  //   title: "Classroom",
  //   route: "/dashboard/classroom",
  //   id: Math.random(),
  // },
  {
    icon: <FaLanguage size={30} />,
    title: 'Favourites',
    route: '/dashboard/favourites',
    id: Math.random(),
  },
]

export const teacherSidebarMenus = [
  {
    icon: <FaLanguage size={30} />,
    title: 'Profile',
    route: '/teacher',
    id: Math.random(),
  },
  {
    icon: <FaLanguage size={30} />,
    title: 'Class',
    route: '/teacher/class',
    id: Math.random(),
  },
]

export const SchoolSidebarMenus = [

  {
    icon: <FaLanguage size={20} />,
    title: 'Profile',
    id: 0,
    route: '/school/profile',
  },
  {
    icon: <FaLanguage size={20} />,
    title: 'Teachers',
    id: 1,
    route: '/school/teacher',
  },
  {
    icon: <FaLanguage size={20} />,
    title: 'Student',
    id: 2,
    route: '/school/student',
  },
  {
    icon: <FaLanguage size={20} />,
    title: 'Class',
    id: 3,
    route: '/school/class',
  },
  
]
