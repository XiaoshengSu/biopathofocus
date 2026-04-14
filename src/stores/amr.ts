import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAmrStore = defineStore('amr', () => {
  const filter = ref({ amrClass: '', amrGene: '' })
  const pagination = ref({ page: 1, pageSize: 20, total: 0 })

  function resetFilter() { filter.value = { amrClass: '', amrGene: '' } }
  return { filter, pagination, resetFilter }
})
