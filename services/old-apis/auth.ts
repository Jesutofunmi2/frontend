import useSWRMutation from 'swr/mutation'
import { login, schoolLogin, teacherLogin } from '../redux/features/userSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import makeApiCall from '../Apis'



//STUDENT LOGIN
export const useLoginStudent = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  async function sendRequest(url: string, { arg }: any) {
    toast.loading('Signing you in...', {
      position: toast.POSITION.TOP_CENTER,
    })
    try {
      const res = await makeApiCall(url, 'post', arg)
      dispatch(login(res))
      toast.dismiss()

      router?.push('/dashboard/languages')
      if (res.data?.data?.count_down) {
        toast.error(`${res.data?.data?.count_down}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: false,
          theme: 'colored',
        })
      } //note this when you are in the dashboard
      return res
    } catch (err) {
      toast.dismiss()
      if (err) {
        toast.error('Invalid Credentials', {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      return err
    }
  }

  const { trigger, data } = useSWRMutation(`/api/v1/auth/studentLogin`, sendRequest)
  return { trigger, data }
}

// SCHOOL LOGIN
export const useLoginSchool = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  async function sendRequest(url: string, { arg }: any) {
    toast.loading('Signing you in...', {
      position: toast.POSITION.TOP_CENTER,
    })
    try {
      const res = await makeApiCall(url, 'post', arg)
      dispatch(schoolLogin(res))
      toast.dismiss()
      router?.push('/school/profile')
      // console.log(res.data)
      return res
    } catch (err) {
      // console.log(err)
      toast.dismiss()
      if (err) {
        toast.error('Invalid Credentials', {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      return err
    }
  }

  const { trigger, data } = useSWRMutation(`/api/v1/auth/schoolLogin`, sendRequest)

  return { trigger, data }
}

// TEACHER LOGIN
export const useLoginTeacher = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  async function sendRequest(url: string, { arg }: any) {
    toast.loading('Signing you in...', {
      position: toast.POSITION.TOP_CENTER,
    })
    try {
      const res = await makeApiCall(url, 'post', arg)
      dispatch(teacherLogin(res))
      toast.dismiss()
      router?.push('/teacher')
      // console.log(res)
      if (res.data?.data?.count_down) {
        toast.error(`${res.data?.data?.count_down}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: false,
          theme: 'colored',
        })
      }
      return res
    } catch (err) {
      console.log(err)
      toast.dismiss()
      if (err) {
        toast.error('Invalid Credentials', {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      return err
    }
  }

  const { trigger, data } = useSWRMutation(`/api/v1/auth/teacherLogin`, sendRequest)

  return { trigger, data }
}
