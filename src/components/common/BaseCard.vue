<script setup lang="ts">
withDefaults(defineProps<{ title?: string; padding?: boolean }>(), { title: '', padding: true })
</script>

<template>
  <div class="rounded-lg border border-surface-border bg-surface shadow-sm overflow-hidden">
    <div v-if="title" class="flex items-center justify-between border-b border-surface-border px-4 py-2.5 bg-surface-muted/30">
      <h3 class="text-[13px] font-semibold text-ink">{{ title }}</h3>
      <slot name="header-extra" />
    </div>
    <div :class="padding ? 'p-4' : ''" class="min-h-0">
      <slot />
    </div>
  </div>
</template>
