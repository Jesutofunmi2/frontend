import axios from 'axios'
import { TOKEN_KEY } from '../../utils/constants'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  // axios.defaults.headers.common.Authorization = `Bearer ${token}`
  localStorage.setItem(TOKEN_KEY, token)
}
