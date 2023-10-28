import { request } from '@/config/config'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import makeApiCall from '../apis'
import { ITeacher } from '@/types'

//ADD TEACHER
export const useAddTeacher = (mutate, setModalOpen) => {
  const token = useSelector((state) => state?.user?.currentSchool?.token.token)

  // HEADERS
  const config = {
    headers: {
      Authorization: 'Bearer ' + `${token}`,
      'Content-Type': 'multipart/form-data',
    },
  }

  async function sendRequest(url, { arg }) {
    toast.loading('Submitting...', {
      position: toast.POSITION.TOP_RIGHT,
    })
    console.log(arg)
    try {
      const res = await request.post(url, arg, config)
      console.log(res)
      toast.dismiss()
      if (res) {
        toast.success('Teacher Created!', {
          position: toast.POSITION.TOP_RIGHT,
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

  const { trigger, data, isMutating } = useSWRMutation(`api/v1/addTeacher`, sendRequest)

  return { trigger, data, isMutating }
}

//EDIT TEACHER
export const useEditTeacher = (mutate, setModalOpen) => {
  const token = useSelector((state) => state?.user?.currentSchool?.token.token)

  // HEADERS
  const config = {
    headers: {
      Authorization: 'Bearer ' + `${token}`,
    },
  }

  async function sendRequest(url, { arg }) {
    console.log(arg)
    const endpoint = url + arg
    toast.loading('Updating...', {
      position: toast.POSITION.TOP_RIGHT,
    })
    try {
      const res = await request.post(url, arg, config)
      console.log(res)
      toast.dismiss()
      if (res) {
        toast.success('Teacher Updated!', {
          position: toast.POSITION.TOP_RIGHT,
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

  const { trigger, data, isMutating } = useSWRMutation(`/api/v1/updateTeacher`, sendRequest)
  return { trigger, data, isMutating }
}

// GET TEACHERS
export const useGetTeachers = (schoolID: number) => {
  const url = `/api/v1/teachers?school_id=${schoolID}`
  const fetcher = async () => {
    const res = await makeApiCall(url, 'get')
    return res?.data
  }

  const { data ,isLoading, error} = useSWR<ITeacher[],Error>(url, fetcher)
  return { data, isLoading, error }
}

// DELETE TEACHER
export const useDeleteTeacher = (mutate) => {
  const token = useSelector((state) => state?.user?.currentSchool?.token.token)

  // HEADERS
  const config = {
    headers: {
      Authorization: 'Bearer ' + `${token}`,
      'Content-Type': 'multipart/form-data',
    },
  }

  async function sendRequest(url, { arg }) {
    console.log(arg)
    const endpoint = url + arg
    toast.loading('Deleting...', {
      position: toast.POSITION.TOP_RIGHT,
    })
    try {
      const res = await request.delete(endpoint, config)
      console.log(res)
      toast.dismiss()
      if (res) {
        toast.success('Teacher Deleted!', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
      mutate()
      return res
    } catch (err) {
      toast.dismiss()
      console.log(err)
      return err
    }
  }

  const { trigger, data, isMutating } = useSWRMutation(
    `/api/v1/deleteTeacher?teacher_id=`,
    sendRequest
  )

  return { trigger, data, isMutating }
}
