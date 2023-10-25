import { FaLanguage } from "react-icons/fa";

const id = Math.random()

export const sidebarMenus = [
    {
      icon: <FaLanguage size={30} />,
      title: "Learning",
      route: "/dashboard/languages",
      id: Math.random(),
    },
    {
      icon: <FaLanguage size={30} />,
      title: "Video Course",
      route: "/dashboard/video-course",
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
      title: "Favourites",
      route: "/dashboard/favourites",
      id: Math.random(),
    },
  ]; 


  export const teacherSidebarMenus = [
    {
      icon: <FaLanguage size={30} />,
      title: "Profile",
      route: "/teacher",
      id: Math.random(),
    },
    {
      icon: <FaLanguage size={30} />,
      title: "Class",
      route: "/teacher/class",
      id: Math.random(),
    },
  ]; 


  export const SchoolSidebarMenus = [
    // {
    //   icon: <FaLanguage size={20} />,
    //   title: "Dashboard",
    //   id: "1",
    //   route: "/school",
    // },
    // {
    //   icon: <FaLanguage size={20} />,
    //   title: "Profile",
    //   id: "2",
    //   dropdown:"true",
    //   children:[{
    //     title: "Edit Profile",
    //     route: "/school/profile/edit",
    //     id: "1",
    //   }, {
    //     title: "Users",
    //     route: "/school/profile/users",
    //     id: "2",
    //   }]
    // },
    {
      icon: <FaLanguage size={20} />,
      title: "Profile",
      id: Math.random(),
      route: "/school/profile",
    },
    {
      icon: <FaLanguage size={20} />,
      title: "Teachers",
      id: Math.random(),
      route: "/school/teacher",
    },
    {
      icon: <FaLanguage size={20} />,
      title: "Student",
      // route:"/student",
      id: Math.random(),
      route: "/school/student",
    },
    {
      icon: <FaLanguage size={20} />,
      title: "Class",
      id: Math.random(),
      route: "/school/class",
    },
    // {
    //   icon: <FaLanguage size={20} />,
    //   title: "Notifications",
    //   id: "6",
    //   route: "/school/notifications",
    // },
  ]; 