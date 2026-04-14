import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVfStore = defineStore('vf', () => {
  const filter = ref({ vfCategory: '', vfGene: '' })
  const pagination = ref({ page: 1, pageSize: 20, total: 0 })

  function resetFilter() { filter.value = { vfCategory: '', vfGene: '' } }
  return { filter, pagination, resetFilter }
})
