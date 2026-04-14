import request from '@/utils/request'
import type { ApiResponse } from '@/types/api'
import type { GeoDistribution, TimelineData, PieDataItem, AttributeStats } from '@/types/dashboard'

export const dashboardApi = {
  getGeoDistribution(): Promise<ApiResponse<GeoDistribution[]>> {
    return request.get('/api/dashboard/geo-distribution')
  },
  getTimeline(): Promise<ApiResponse<TimelineData[]>> {
    return request.get('/api/dashboard/timeline')
  },
  getCountryPie(): Promise<ApiResponse<PieDataItem[]>> {
    return request.get('/api/dashboard/country-pie')
  },
  getAmrStats(): Promise<ApiResponse<PieDataItem[]>> {
    return request.get('/api/dashboard/amr-stats')
  },
  getVfStats(): Promise<ApiResponse<PieDataItem[]>> {
    return request.get('/api/dashboard/vf-stats')
  },
  getAttributeStats(): Promise<ApiResponse<AttributeStats[]>> {
    return request.get('/api/dashboard/attribute-stats')
  },
}
