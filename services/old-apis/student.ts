import { request } from '@/config/config'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import makeApiCall from '../apis'
import { IStudent } from '@/types'
import { ScopedMutator } from 'swr/_internal'
import { IAddStudentRequest } from '@/types/student'

//ADD STUDENT
export const addStudent = async (payload: IAddStudentRequest) => {
  toast.loading('Submitting...', {
    position: toast.POSITION.TOP_CENTER,
  })
  try {
    const res = await makeApiCall(`/api/v1/createStudent`, 'post', payload)
    toast.dismiss()
    if (res) {
      toast.success('Student Created!', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
    return res
  } catch (err) {
    toast.dismiss()
    console.log(err)
    return err
  }
}

// const { trigger, data, isMutating } = useSWRMutation(`/api/v1/createStudent`, sendRequest)

// return { trigger, data, isMutating }
// }

//EDIT STUDENT
export const editStudent = async (studentId: string, payload) => {
  // async function sendRequest(url, { arg }) {

  toast.loading('Updating...', {
    position: toast.POSITION.TOP_CENTER,
  })
  try {
    const res = await makeApiCall(`/api/v1/updateStudent?student_id=${studentId}`, 'put', payload)
    console.log(res)
    toast.dismiss()
    if (res) {
      toast.success('Student Updated!', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
    return res
  } catch (err) {
    toast.dismiss()
    console.log(err)
    return err
  }
}

// GET STUDENTS
export const useGetStudents = (schoolID: number) => {
  const url = `/api/v1/students?school_id=${schoolID}`
  const fetcher = async () => {
    const res = await makeApiCall(url, 'get')
    return res?.data
  }

  const { data, isLoading, error, mutate } = useSWR<IStudent[], Error>(url, fetcher)
  return { error, data, isLoading, mutate }
}

// DELETE STUDENT
export const deleteStudent = async (studentId: number) => {
  try {
    const res = await makeApiCall(`/api/v1/deleteStudent?student_id=${studentId}`, 'delete')
    if (res) {
      toast.success('Student Deleted!', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
    return res
  } catch (err) {
    toast.dismiss()
    console.log(err)
    return err
  }
}
