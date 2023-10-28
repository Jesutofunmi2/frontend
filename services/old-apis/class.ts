import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { toast } from 'react-toastify'
import makeApiCall from '../Apis'
import { IClass } from '@/types'

//ADD CLASS
export const useAddClass = (
  payloadData: { school_id: string; language_id: string; class_room_name: string },
  mutate: () => void
) => {
  async function sendRequest(url: string, { arg }: any) {
    toast.loading('Submitting...', {
      position: toast.POSITION.TOP_RIGHT,
    })
    console.log(arg)
    try {
      const res = await makeApiCall(url, 'post', arg)
      mutate()
      console.log(res)
      toast.dismiss()
      if (res) {
        toast.success('Class Created!', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
      // mutate()
      return res
    } catch (err) {
      toast.dismiss()
      if (err) {
        toast.error('Something went wrong', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
      console.log(err)
      return err
    }
  }

  const { trigger, data, isMutating } = useSWRMutation(
    `/api/v1/addClass?school_id=${payloadData?.school_id}&language_id=${payloadData?.language_id}&class_room_name=${payloadData?.class_room_name}`,
    sendRequest
  )

  return { trigger, data, isMutating }
}

// GET CLASSES
export const useGetClasses = (schoolID: number) => {
  const url = `/api/v1/showSchoolClasses?school_id=${schoolID}`
  const fetcher = async (...args: string[]) => {
    const res = await makeApiCall(url, 'get', ...args)

    return res?.data
  }

  const { data, isLoading, error } = useSWR<IClass[],Error>(url, fetcher)

  return { data, isLoading, error  }
}

// DELETE CLASS
export const useDeleteClass = (schoolID: number, teacherId: number, mutate: () => void) => {
  async function sendRequest(url: string, { arg }) {
    const endpoint = url + arg?.className
    toast.loading('Deleting...', {
      position: toast.POSITION.TOP_RIGHT,
    })
    try {
      const res = await makeApiCall(endpoint, 'delete')
      mutate()
      console.log(res)
      toast.dismiss()

      if (res) {
        toast.success('Class Deleted!', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
      return res
    } catch (err) {
      toast.dismiss()
      if (err) {
        toast.error('Something went wrong', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
      console.log(err)
      return err
    }
  }

  const { trigger, data, isMutating } = useSWRMutation(`/api/v1/deleteClass`, sendRequest)

  return { trigger, data, isMutating }
}

//ADD CLASS ARM
export const useAddClassArm = (
  payloadData: { school_id: string; class_id: number; language_id: string; data: never[] },
  mutate: () => void
) => {
  async function sendRequest(url: string, { arg }) {
    toast.loading('Submitting...', {
      position: toast.POSITION.TOP_RIGHT,
    })

    try {
      const res = await makeApiCall(url, 'post', arg)
      mutate()

      toast.dismiss()
      if (res) {
        toast.success('Class Arm Created!', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
      // mutate()
      return res
    } catch (err) {
      toast.dismiss()
      if (err) {
        toast.error('Something went wrong', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
      // console.log(err)
      return err
    }
  }

  const { trigger, data, isMutating } = useSWRMutation(`/api/v1/addClassarm`, sendRequest)

  return { trigger, data, isMutating }
}

// GET CLASs ARM BY ID
export const getClassArmById = async(schoolID: number, classID: string) => {
  console.log(schoolID)
  console.log(classID)
  // HEADERS

    const res = await makeApiCall(`/api/v1/getSingleClass?school_id=${schoolID}&class_id=${classID}`,'get')
    console.log(res)
    return res?.data
  

  // const { data,  isValidating, mutate } = useSWR(
  //   `/api/v1/getSingleClass?school_id=${schoolID}&class_id=${classID}`,
  //   fetcher
  // )
  // return { mutate, data, isValidating }
}
