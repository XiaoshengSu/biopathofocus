<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  page: number
  pageSize: number
  total: number
}>(), {
  page: 1,
  pageSize: 20,
  total: 0,
})

const emit = defineEmits<{
  'update:page': [page: number]
}>()

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

const pages = computed(() => {
  const total = totalPages.value
  const current = props.page
  const items: (number | string)[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) items.push(i)
  } else {
    items.push(1)
    if (current > 3) items.push('...')
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    for (let i = start; i <= end; i++) items.push(i)
    if (current < total - 2) items.push('...')
    items.push(total)
  }

  return items
})
</script>

<template>
  <div class="flex items-center gap-1 text-sm">
    <span class="mr-2 text-xs text-ink-disabled">共 {{ total }} 条</span>
    <button
      :disabled="page <= 1"
      class="flex h-8 w-8 items-center justify-center rounded-md text-ink-secondary hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40"
      @click="emit('update:page', page - 1)"
    >
      ‹
    </button>
    <template v-for="p in pages" :key="p">
      <span v-if="p === '...'" class="px-1 text-ink-disabled">...</span>
      <button
        v-else
        class="flex h-8 w-8 items-center justify-center rounded-md transition-colors"
        :class="p === page ? 'bg-primary-500 text-white' : 'text-ink-secondary hover:bg-surface-muted'"
        @click="emit('update:page', p as number)"
      >
        {{ p }}
      </button>
    </template>
    <button
      :disabled="page >= totalPages"
      class="flex h-8 w-8 items-center justify-center rounded-md text-ink-secondary hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40"
      @click="emit('update:page', page + 1)"
    >
      ›
    </button>
  </div>
</template>
