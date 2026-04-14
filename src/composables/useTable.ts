import { ref, reactive } from 'vue'
import type { ApiResponse, PaginatedData } from '@/types/api'

interface UseTableOptions<T, P> {
  fetchFn: (params: P) => Promise<ApiResponse<PaginatedData<T>>>
  defaultParams?: P
}

export function useTable<T = any, P extends Record<string, any> = Record<string, any>>(
  fetchFn: (params: P) => Promise<ApiResponse<PaginatedData<T>>>,
  defaultParams: P = {} as P,
) {
  const data = ref<T[]>([]) as any
  const loading = ref(false)
  const pagination = reactive({
    page: 1,
    pageSize: 20,
    total: 0,
  })

  async function loadData(params?: Partial<P>) {
    loading.value = true
    try {
      const res = await fetchFn({
        ...defaultParams,
        ...params,
        page: pagination.page,
        pageSize: pagination.pageSize,
      } as P)
      data.value = res.data.list
      pagination.total = res.data.total
    } catch (e) {
      console.error('Table load failed:', e)
    } finally {
      loading.value = false
    }
  }

  function changePage(page: number) {
    pagination.page = page
    loadData()
  }

  return { data, loading, pagination, loadData, changePage }
}
