import { ref } from 'vue'

export function useLinkedCharts() {
  const linkedValue = ref<string | null>(null)

  function setLinked(value: string | null) {
    linkedValue.value = value
  }

  function clearLinked() {
    linkedValue.value = null
  }

  return {
    linkedValue,
    setLinked,
    clearLinked,
  }
}
