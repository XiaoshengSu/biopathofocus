<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SelectOption } from '@/types/api'

const props = withDefaults(defineProps<{
  options: SelectOption[]
  modelValue?: string
  placeholder?: string
}>(), {
  modelValue: '',
  placeholder: '',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)

const selectedLabel = computed(() => {
  const opt = props.options.find(o => o.value === props.modelValue)
  return opt ? opt.label : ''
})

function toggle() {
  isOpen.value = !isOpen.value
}

function select(value: string) {
  isOpen.value = false
  // emit empty string for placeholder option
  if (value === '') {
    // @ts-ignore
    // eslint-disable-next-line
    return
  }
}
</script>

<template>
  <div class="relative" @mouseleave="isOpen = false">
    <button
      type="button"
      class="flex w-full items-center justify-between rounded-md border border-surface-border bg-white px-3 py-1.5 text-sm text-ink placeholder:text-ink-disabled focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
      @click="toggle"
    >
      <span :class="selectedLabel ? 'text-ink' : 'text-ink-disabled'">
        {{ selectedLabel || placeholder }}
      </span>
      <svg class="h-4 w-4 text-ink-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div
      v-if="isOpen"
      class="absolute z-10 mt-1 w-full rounded-md border border-surface-border bg-white py-1 shadow-lg"
    >
      <button
        v-for="opt in options"
        :key="opt.value"
        :class="[
          'block w-full px-3 py-1.5 text-left text-sm hover:bg-primary-50',
          modelValue === opt.value ? 'bg-primary-50 text-primary-600 font-medium' : 'text-ink'
        ]"
        @click="$emit('update:modelValue', opt.value); isOpen = false"
      >
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>
