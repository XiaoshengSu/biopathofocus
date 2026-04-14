import { ref, type Ref } from 'vue'

export function useFilter<T extends Record<string, string>>(defaultFilter: T) {
  const filter = ref({ ...defaultFilter }) as Ref<T>
  const isDirty = ref(false)

  function setField(key: keyof T, value: string) {
    filter.value[key] = value
    isDirty.value = true
  }

  function reset() {
    Object.assign(filter.value, defaultFilter)
    isDirty.value = false
  }

  function getParams() {
    const params: Record<string, string> = {}
    for (const [key, value] of Object.entries(filter.value)) {
      if (value !== '') params[key] = value
    }
    return params
  }

  return { filter, isDirty, setField, reset, getParams }
}
