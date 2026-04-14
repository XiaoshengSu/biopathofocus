<script setup lang="ts">
defineEmits<{
  search: []
  reset: []
}>()
</script>

<template>
  <div class="flex flex-wrap items-center gap-2.5 rounded-lg border border-surface-border bg-surface px-4 py-3">
    <slot />
    <div class="flex gap-2 ml-auto">
      <slot name="actions" />
      <button class="px-3.5 py-1.5 text-xs font-medium rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors shadow-sm">
        搜索
      </button>
      <button class="px-3.5 py-1.5 text-xs font-medium rounded-md bg-surface-muted text-ink-secondary hover:bg-surface-border hover:text-ink transition-colors border border-surface-border">
        重置
      </button>
    </div>
  </div>
</template>
