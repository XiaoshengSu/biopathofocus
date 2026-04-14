import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
import type { SampleFilter, SampleFilterKey } from '@/types/sample'

const FILTER_LABELS: Record<SampleFilterKey, string> = {
  sampleType: '样本类型',
  host: '宿主',
  country: '采样国家',
  species: '分离菌',
  st: 'ST 型',
  serotype: '血清型',
}

export const useSampleStore = defineStore('sample', () => {
  const filters = reactive<SampleFilter>({
    sampleType: '',
    host: '',
    country: '',
    species: '',
    st: '',
    serotype: '',
  })

  const activeFilterTags = computed(() => {
    return (Object.keys(filters) as SampleFilterKey[])
      .filter(key => filters[key])
      .map(key => ({
        key,
        label: FILTER_LABELS[key],
        value: filters[key],
      }))
  })

  function setFilter(key: SampleFilterKey, value: string) {
    filters[key] = value
  }

  function resetFilters() {
    Object.keys(filters).forEach(key => {
      filters[key as SampleFilterKey] = ''
    })
  }

  return { filters, activeFilterTags, setFilter, resetFilters }
})
