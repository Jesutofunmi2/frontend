import axios, { AxiosRequestConfig } from 'axios'
import { getToken } from '../old-apis/token'

const token = getToken()
const baseURL = 'https://remotedev.izesan.com'

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

async function makeApiCall<T = any>(
  url: string,
  method: AxiosRequestConfig['method'] = 'get',

  payload?: AxiosRequestConfig['data'],
  axiosRequestConfig?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>
): Promise<T> {
  try {
    if (!baseURL || typeof baseURL !== 'string') {
      throw new Error('API_BASEURL is not defined')
    }
    const { data } = await axios({
      url,
      method,
      data: payload,
      baseURL,
      ...axiosRequestConfig,
    })

    return data
  } catch (error: any) {
    // if (error.response) {
    //   window.location.assign('/login')
    console.log(error)
    // }
  }

  throw new Error()
}

export default makeApiCall