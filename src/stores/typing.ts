import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTypingStore = defineStore('typing', () => {
  const mlstFilter = ref({ st: '' })
  const antigenFilter = ref({ kType: '', oType: '', hType: '' })

  function resetMlstFilter() { mlstFilter.value = { st: '' } }
  function resetAntigenFilter() { antigenFilter.value = { kType: '', oType: '', hType: '' } }

  return { mlstFilter, antigenFilter, resetMlstFilter, resetAntigenFilter }
})
