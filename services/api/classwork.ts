import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'

import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import makeApiCall from '../apis'

//ADD CLASSWORK
export const useAddClasswork = (mutate) => {
  const router = useRouter()

  async function sendRequest(url, { arg }) {
    toast.loading('Submitting...', {
      position: toast.POSITION.TOP_RIGHT,
    })
    console.log(arg)
    try {
      const res = await makeApiCall(url, 'post', arg)
      console.log(res)
      toast.dismiss()
      if (res) {
        toast.success('Classwork Created!', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
      router.back()
      mutate()
      return res
    } catch (err) {
      toast.dismiss()
      console.log(err)
      return err
    }
  }

  const { trigger, data, isMutating } = useSWRMutation(`/api/v1/addClassWork`, sendRequest)

  return { trigger, data, isMutating }
}

//GET CLASSWORK
export const useGetClasswork = (teacherID, schoolID, classID) => {
  //NEW WAY TO FETCH DATA
  const fetcher = async (...args) => {
    const res = await makeApiCall('get')
    console.log(res)
    return res?.data
  }

  const { data, isValidating, mutate } = useSWR(
    `/api/v1/ClassWork?school_id=${schoolID}&class_id=${classID}&teacher_id=${teacherID}`,
    fetcher
  )
  return { data, isValidating, mutate }
}

// DELETE CLASSWORK
export const useDeleteClasswork = (mutate) => {
  async function sendRequest(param) {
    const endpoint = `/api/v1/deleteClassWork?school_id=${param?.schoolID}&teacher_id=${param?.teacherID}&name=${param?.name}&class_id=${param?.classID}`
    toast.loading('Deleting...', {
      position: toast.POSITION.TOP_RIGHT,
    })
    try {
      const res = await makeApiCall(endpoint, 'delete')
      console.log(res)
      toast.dismiss()
      mutate()
      if (res) {
        toast.success('Classwork Deleted!', {
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
  return { sendRequest }
}
