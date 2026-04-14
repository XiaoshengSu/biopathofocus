import request from '@/utils/request'
import type { ApiResponse, PaginatedData, PaginationParams, SelectOption } from '@/types/api'
import type { VfGeneRow, VfStats } from '@/types/vf'

export interface VfMatrixParams extends PaginationParams {
  vfCategory?: string
  vfGene?: string
}

export const vfApi = {
  getMatrix(params: VfMatrixParams): Promise<ApiResponse<PaginatedData<VfGeneRow>>> {
    return request.get('/api/vf/matrix', { params })
  },
  getStats(params: { vfCategory?: string }): Promise<ApiResponse<VfStats>> {
    return request.get('/api/vf/stats', { params })
  },
  getCategories(): Promise<ApiResponse<SelectOption[]>> {
    return request.get('/api/vf/categories')
  },
}
