import axios from 'axios'
import { useAuthStore } from '../stores/auth'

export default () => {
  const auth = useAuthStore()

  return axios.create({
    baseURL: 'http://localhost:8081/',
    headers: {
      Authorization: auth.token
        ? `Bearer ${auth.token}`
        : ''
    }
  })
}
