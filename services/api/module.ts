import useSWR from 'swr'
import { toast } from 'react-toastify'
import makeApiCall from '.'

//ADD MODULE FOR TEACHER
export const useAddModule = async (payload: any) => {
  toast.loading('Submitting...', {
    position: toast.POSITION.TOP_RIGHT,
  })
  try {
    const res = await makeApiCall(`/api/v1/teacher/assignedModule`, 'post', payload)
    toast.dismiss()
    if (res) {
      toast.success('Module Created!', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
    return res
  } catch (err) {
    toast.dismiss()

    return err
  }
}

//GET MODULE FOR TEACHER
export const useGetAssignedModule = (param: any) => {
  const fetcher = async () => {
    const res = await makeApiCall(
      `/api/v1/teacher/assignedModule?school_id=${param.school_id}&teacher_id=${param.teacher_id}`,
      'get'
    )
    return res?.data
  }
  const { data, isValidating, mutate } = useSWR(
    `/api/v1/teacher/assignedModule?school_id=${param.school_id}&teacher_id=${param.teacher_id}`,
    fetcher
  )
  return { data, isValidating, mutate }
}

// DELETE MODULE
export const deleteModule = async (param: any) => {
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

    return err
  }
}

//GET MODULE FOR STUDENT
export const useGetAssignedModuleStudent = (param: any) => {
  const fetcher = async () => {
    const res = await makeApiCall(
      `api/v1/student/assignedModule?school_id=${param?.school_id}&class_id=${param?.teacher_id}`,
      'get'
    )
    return res?.data
  }
  const { data, isValidating, mutate } = useSWR(
    `api/v1/student/assignedModule?school_id=${param?.school_id}&class_id=${param?.teacher_id}`,
    fetcher
  )
  return { data, isValidating, mutate }
}
