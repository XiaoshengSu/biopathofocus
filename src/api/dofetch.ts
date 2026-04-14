import axios from 'axios'
import type { ApiResponse, PaginatedResponse } from '@/types/api'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const msg = error.response?.data?.message || '请求失败'
    console.error(`[API Error] ${error.config?.url}: ${msg}`)
    return Promise.reject(error)
  },
)

export async function dofetch<T>(url: string, options: { method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; params?: Record<string, unknown>; data?: unknown } = {}): Promise<ApiResponse<T>> {
  const { method = 'GET', params, data } = options
  const res = await http.request<ApiResponse<T>>({ url, method, params, data })
  return res as unknown as ApiResponse<T>
}

export async function dofetchPaginated<T>(url: string, params: Record<string, unknown>): Promise<PaginatedResponse<T>> {
  const res = await http.request<PaginatedResponse<T>>({ url, method: 'GET', params })
  return res as unknown as PaginatedResponse<T>
}
