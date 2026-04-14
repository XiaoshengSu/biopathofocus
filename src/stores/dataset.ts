import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDatasetStore = defineStore('dataset', () => {
  const currentId = ref('default')
  const currentName = ref('数据集:XXXX')

  function setDataset(id: string, name: string) {
    currentId.value = id
    currentName.value = name
  }

  return { currentId, currentName, setDataset }
})
