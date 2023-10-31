import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { toast } from 'react-toastify'
import makeApiCall from '..'
import { IClass } from '@/types/class'
import { ClassArmPayload } from '@/types/classarm'

// GET CLASSES
export const useGetClasses = (schoolID: string) => {
  const url = `/api/v1/showSchoolClasses?school_id=${schoolID}`
  const fetcher = async (...args: string[]) => {
    const res = await makeApiCall(url, 'get', ...args)
    return res?.data
  }
  const { data, isLoading, error, mutate } = useSWR<IClass[], Error>(url, fetcher)
  return { data, isLoading, error, mutate }
}

//ADD CLASS
export const addClass = async (
  school_id: number,
  language_id: number,
  class_room_name: string,

) => {
  toast.loading('Submitting...', {
    position: toast.POSITION.TOP_RIGHT,
  })
  try {
    const res = await makeApiCall(
      `/api/v1/addClass?school_id=${school_id}&language_id=${language_id}&class_room_name=${class_room_name}`,
      'post'
    )
    toast.dismiss()
    if (res) {
      toast.success('Class Created!', {
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

// EditClass
// No endpoints yet

// DELETE CLASS
export const deleteClass = async (school_id: number, class_id: number) => {
  toast.loading('Deleting...', {
    position: toast.POSITION.TOP_RIGHT,
  })
  try {
    const res = await makeApiCall(
      `/deleteSchoolClass?school_id=${school_id}&class_id=${class_id}`,
      'delete'
    )
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

///////////////////////////////////////////////////////////////////////////////////////////
//ADD CLASS ARM
export const addClassArm = async (payloadData: ClassArmPayload|any) => {
  toast.loading('Submitting...', {
    position: toast.POSITION.TOP_RIGHT,
  })
  try {
    const res = await makeApiCall(`/api/v1/addClassarm`, 'post', payloadData)
    toast.dismiss()
    if (res) {
      toast.success('Class Arm Created!', {
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
    return err
  }
}

// GET CLASS BY ID
export const getClassById = async (schoolID: string, classID: number) => {
  const res = await makeApiCall(
    `/api/v1/getSingleClass?school_id=${schoolID}&class_id=${classID}`,
    'get'
  )
  return res.data
}
