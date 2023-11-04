import axios from 'axios'
import { TOKEN_KEY } from '../../utils/constants'

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY)
  }
}
export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY)
  }
}
export function setToken(token: string) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token)
  }
}
