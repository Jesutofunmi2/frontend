// import { request, tokens } from "@/config/config";
// import useSWRMutation from "swr/mutation";
import useSWR from 'swr'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import makeApiCall from '.'

//ADD MODULE FOR TEACHER
export const useAddModule = async (payload: any) => {
  toast.loading('Submitting...', {
    position: toast.POSITION.TOP_RIGHT,
  })

  try {
    const res = await makeApiCall(`/api/v1/teacher/assignedModule`, 'post', payload)
    console.log(res)
    toast.dismiss()
    if (res) {
      toast.success('Module Created!', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }

    return res
  } catch (err) {
    toast.dismiss()
    console.log(err)
    return err
  }
}

//GET MODULE FOR TEACHER
export const useGetAssignedModule =  (param: any) => {
  // const teacherToken = useSelector((state) => state?.user?.currentTeacher?.token.token)

  const fetcher = async () => {
    const res = await makeApiCall(
      `/api/v1/teacher/assignedModule?school_id=${param.school_id}&teacher_id=${param.teacher_id}`,
      'get'
    )
    return res?.data
  }

  const { data, isValidating , mutate } = useSWR(
    `/api/v1/teacher/assignedModule?school_id=${param.school_id}&teacher_id=${param.teacher_id}`,
    fetcher
  )
  return { data, isValidating, mutate }
}

// DELETE MODULE
export const deleteModule = async (param: any) => {
  // const token = useSelector((state) => state?.user?.currentSchool?.token?.token)

   toast.loading('Deleting...', {
    position: toast.POSITION.TOP_RIGHT,
  })
  try {
    const res = await makeApiCall(
      `/api/v1/delete/assignedModule?school_id=${param?.school_id}&teacher_id=${param?.teacher_id}?id=${param.id}`,
      'delete'
    )

    toast.dismiss()
    if (res) {
      toast.success('Module Deleted!', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
    return res
  } catch (err) {
    toast.dismiss()
    console.log(err)
    return err
  }
}

//GET MODULE FOR STUDENT
export const useGetAssignedModuleStudent = (param: any) => {
  // const teacherToken = useSelector((state) => state?.user?.currentTeacher?.token.token)

  // // HEADERS
  // const config = {
  //   headers: {
  //     Authorization: 'Bearer ' + `${teacherToken}`,
  //   },
  // }

  const fetcher = async () => {
    const res = await makeApiCall(
      `api/v1/student/assignedModule?school_id=${param?.school_id}&class_id=${param?.teacher_id}`,
      'get'
    )
    console.log(res)
    return res?.data
  }

  const { data, isValidating, mutate } = useSWR(
    `api/v1/student/assignedModule?school_id=${param?.school_id}&class_id=${param?.teacher_id}`,
    fetcher
  )
  return { data, isValidating, mutate }
}
