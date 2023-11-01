
import useSWR from 'swr'

import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import makeApiCall from '.'

//ADD CLASSWORK
export const addClasswork = async (payload: any) => {
  toast.loading('Submitting...', {
    position: toast.POSITION.TOP_RIGHT,
  })

  try {
    const res = await makeApiCall(`/api/v1/addClassWork`, 'post', payload)
    console.log(res)
    toast.dismiss()
    if (res) {
      toast.success('Classwork Created!', {
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

//GET CLASSWORK
export const useGetClasswork = (teacherID: number, schoolID: number, classID: number) => {
  //NEW WAY TO FETCH DATA
  const fetcher = async () => {
    const res = await makeApiCall( `/api/v1/ClassWork?school_id=${schoolID}&class_id=${classID}&teacher_id=${teacherID}`,'get')
    return res?.data
  }

  const { data, isValidating, mutate } = useSWR(
    `/api/v1/ClassWork?school_id=${schoolID}&class_id=${classID}&teacher_id=${teacherID}`,
    fetcher
  )
  return { data, isValidating, mutate }
}

// DELETE CLASSWORK
export const deleteClasswork = async (param: any) => {
  const endpoint = `/api/v1/deleteClassWork?school_id=${param?.schoolID}&teacher_id=${param?.teacherID}&name=${param?.name}&class_id=${param?.classID}`
  toast.loading('Deleting...', {
    position: toast.POSITION.TOP_RIGHT,
  })
  try {
    const res = await makeApiCall(endpoint, 'delete')
    console.log(res)
    toast.dismiss()

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
