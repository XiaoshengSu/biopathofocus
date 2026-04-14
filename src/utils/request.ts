import axios from 'axios'
import type { ApiResponse } from '@/types/api'

const request = axios.create({
  baseURL: '',
  timeout: 30000,
})

request.interceptors.response.use(
  (response) => response.data as ApiResponse,
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  },
)

export default request
