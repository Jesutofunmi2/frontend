import { request } from '@/config/config'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import makeApiCall from '../apis'
import { IStudent } from '@/types'
import { ScopedMutator } from 'swr/_internal'

//ADD STUDENT
export const useAddStudent = (mutate, setModalOpen?) => {
  const token = useSelector((state) => state?.user?.currentSchool?.token.token)

  // HEADERS
  const config = {
    headers: {
      Authorization: 'Bearer ' + `${token}`,
    },
  }

  async function sendRequest(url, { arg }) {
    toast.loading('Submitting...', {
      position: toast.POSITION.TOP_CENTER,
    })
    console.log(arg)
    try {
      const res = await request.post(url, arg, config)
      console.log(res)
      toast.dismiss()
      if (res) {
        toast.success('Student Created!', {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      setModalOpen(false)
      mutate()
      return res
    } catch (err) {
      toast.dismiss()
      console.log(err)
      return err
    }
  }

  const { trigger, data, isMutating } = useSWRMutation(`/api/v1/createStudent`, sendRequest)

  return { trigger, data, isMutating }
}

//EDIT STUDENT
export const useEditStudent = (mutate, setModalOpen?) => {
  const token = useSelector((state) => state?.user?.currentSchool?.token.token)

  // HEADERS
  const config = {
    headers: {
      Authorization: 'Bearer ' + `${token}`,
    },
  }

  async function sendRequest(url, { arg }) {
    console.log(arg)
    const endpoint = url + arg?.id
    toast.loading('Updating...', {
      position: toast.POSITION.TOP_CENTER,
    })
    try {
      const res = await request.put(endpoint, arg?.payload, config)
      console.log(res)
      toast.dismiss()
      if (res) {
        toast.success('Student Updated!', {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      setModalOpen(false)
      mutate()
      return res
    } catch (err) {
      toast.dismiss()
      console.log(err)
      return err
    }
  }

  const { trigger, data, isMutating } = useSWRMutation(
    `/api/v1/updateStudent?student_id=`,
    sendRequest
  )

  return { trigger, data, isMutating }
}

// GET STUDENTS
export const useGetStudents = (schoolID: number) => {
  const url = `/api/v1/students?school_id=${schoolID}`
  const fetcher = async () => {
    const res = await makeApiCall(url, 'get')
    return res?.data
  }

  const { data, isLoading, error } = useSWR<IStudent[], Error>(url, fetcher)
  return { error, data, isLoading }
}

// DELETE STUDENT
export const deleteStudent = async (studentId: number) => {
  const res = await makeApiCall(`/api/v1/deleteStudent?student_id=${studentId}`, 'delete')
  console.log(res)
}
