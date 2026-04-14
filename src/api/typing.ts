import request from '@/utils/request'
import type { ApiResponse, PaginatedData, PaginationParams } from '@/types/api'
import type { MlstRow, CgmlstRow, AntigenRow } from '@/types/typing'

export interface MlstListParams extends PaginationParams {
  st?: string
}

export interface AntigenListParams extends PaginationParams {
  kType?: string
  oType?: string
  hType?: string
}

export const typingApi = {
  getMlstList(params: MlstListParams): Promise<ApiResponse<PaginatedData<MlstRow>>> {
    return request.get('/api/typing/mlst', { params })
  },
  getMlstPie(params: { st?: string }): Promise<ApiResponse<{ name: string; value: number }[]>> {
    return request.get('/api/typing/mlst/pie-chart', { params })
  },
  getCgmlstList(params: PaginationParams): Promise<ApiResponse<PaginatedData<CgmlstRow>>> {
    return request.get('/api/typing/cgmlst', { params })
  },
  getAntigenList(params: AntigenListParams): Promise<ApiResponse<PaginatedData<AntigenRow>>> {
    return request.get('/api/typing/antigen', { params })
  },
}
