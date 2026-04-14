export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export interface PaginatedData<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

export interface Column {
  key: string
  label: string
  width?: number
  sortable?: boolean
}

export interface SelectOption {
  label: string
  value: string
}

export interface PaginationParams {
  page?: number
  pageSize?: number
}
