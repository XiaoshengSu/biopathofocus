import request from '@/utils/request'
import type { ApiResponse, PaginatedData, PaginationParams } from '@/types/api'

export interface SampleListParams extends PaginationParams {
  sampleType?: string
  host?: string
  country?: string
  species?: string
  st?: string
  serotype?: string
}

export interface SampleRecord {
  id: string
  name: string
  type: string
  species: string
  serotype: string
  st: number
  host: string
  country: string
  isolationDate: string
  institution: string
  submitter: string
}

export const sampleApi = {
  getList(params: SampleListParams): Promise<ApiResponse<PaginatedData<SampleRecord>>> {
    return request.get('/api/samples', { params })
  },
  getById(id: string): Promise<ApiResponse<SampleRecord>> {
    return request.get(`/api/samples/${id}`)
  },
}
