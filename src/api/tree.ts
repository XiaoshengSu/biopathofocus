import request from '@/utils/request'
import type { ApiResponse } from '@/types/api'
import type { TreeData, HeatmapCell } from '@/types/tree'

export const treeApi = {
  getData(): Promise<ApiResponse<TreeData>> {
    return request.get('/api/tree-heatmap/data')
  },
  getHeatmap(): Promise<ApiResponse<HeatmapCell[]>> {
    return request.get('/api/tree-heatmap/heatmap')
  },
}
