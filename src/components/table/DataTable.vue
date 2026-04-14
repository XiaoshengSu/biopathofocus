<script setup lang="ts">
import type { Column } from '@/types/api'

withDefaults(defineProps<{
  columns: Column[]
  data: Record<string, any>[]
  loading?: boolean
  maxHeight?: string
}>(), {
  loading: false,
  maxHeight: '400px',
})
</script>

<template>
  <div class="overflow-auto rounded-lg border border-surface-border" :style="{ maxHeight }">
    <table class="w-full text-sm">
      <thead class="sticky top-0 z-10 bg-surface-header">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            class="whitespace-nowrap border-b border-surface-border px-3 py-2.5 text-left text-xs font-medium text-ink-secondary"
            :style="col.width ? { width: col.width + 'px' } : {}"
          >
            {{ col.label }}
            <span v-if="col.sortable" class="ml-1 cursor-pointer text-ink-disabled">&#8693;</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="columns.length" class="px-3 py-8 text-center text-ink-disabled">
            <div class="flex items-center justify-center gap-2">
              <svg class="h-4 w-4 animate-spin text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              加载中...
            </div>
          </td>
        </tr>
        <tr v-else-if="!data.length">
          <td :colspan="columns.length" class="px-3 py-8 text-center text-ink-disabled">
            暂无数据
          </td>
        </tr>
        <tr
          v-else
          v-for="(row, idx) in data"
          :key="idx"
          class="border-b border-surface-border last:border-0 hover:bg-surface-hover transition-colors"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            class="whitespace-nowrap px-3 py-2 text-ink"
            :style="col.width ? { maxWidth: col.width + 'px' } : {}"
          >
            <slot :name="col.key" :value="row[col.key]" :row="row">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
