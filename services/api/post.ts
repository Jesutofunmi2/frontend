// import { request, tokens } from "@/config/config";
import useSWRMutation from 'swr/mutation'
import { toast } from 'react-toastify'
import makeApiCall from '.'

//ADD MODULE FOR TEACHER
export const addAssignmentFile = async (payload:any) => {
  toast.loading('Submitting...', {
    position: toast.POSITION.TOP_RIGHT,
  })
  try {
    const res = await makeApiCall('/api/v1/teacher/assignment/file', 'post',payload)
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
