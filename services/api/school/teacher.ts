import useSWR from 'swr'
import { toast } from 'react-toastify'
import makeApiCall from '..'
import { ITeacher } from '@/types/teacher'
import { IPayloadTeacher } from '@/types/teacher'

//ADD TEACHER
export const addTeacher = async (payload: IPayloadTeacher) => {
  toast.loading('Submitting...', {
    position: toast.POSITION.TOP_RIGHT,
  })

  try {
    const res = await makeApiCall('api/v1/addTeacher', 'post', payload)
    toast.dismiss()
    if (res) {
      toast.success('Teacher Created!', {
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

//EDIT TEACHER
export const editTeacher = async (payload: any) => {
  toast.loading('Updating...', {
    position: toast.POSITION.TOP_RIGHT,
  })
  try {
    const res = await makeApiCall(`/api/v1/updateTeacher`, 'post', payload)
    toast.dismiss()
    if (res) {
      toast.success('Teacher Updated!', {
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

// GET TEACHERS
export const useGetTeachers = (schoolID: string) => {
  const url = `/api/v1/teachers?school_id=${schoolID}`
  const fetcher = async () => {
    const res = await makeApiCall(url, 'get')
    return res?.data
  }
  const { data, isLoading, error, mutate } = useSWR<ITeacher[], Error>(url, fetcher)
  return { data, isLoading, error, mutate }
}

// DELETE TEACHER
export const deleteTeacher = async (teacher_id: string) => {
  toast.loading('Deleting...', {
    position: toast.POSITION.TOP_RIGHT,
  })
  try {
    const res = await makeApiCall(`/api/v1/deleteTeacher?teacher_id=${teacher_id}`, 'delete')
    toast.dismiss()
    if (res) {
      toast.success('Teacher Deleted!', {
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
