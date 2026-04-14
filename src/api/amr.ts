import request from '@/utils/request'
import type { ApiResponse, PaginatedData, PaginationParams, SelectOption } from '@/types/api'
import type { AmrGeneRow, AmrStats } from '@/types/amr'

export interface AmrMatrixParams extends PaginationParams {
  amrClass?: string
  amrGene?: string
}

export const amrApi = {
  getMatrix(params: AmrMatrixParams): Promise<ApiResponse<PaginatedData<AmrGeneRow>>> {
    return request.get('/api/amr/matrix', { params })
  },
  getStats(params: { amrClass?: string }): Promise<ApiResponse<AmrStats>> {
    return request.get('/api/amr/stats', { params })
  },
  getClasses(): Promise<ApiResponse<SelectOption[]>> {
    return request.get('/api/amr/classes')
  },
}
