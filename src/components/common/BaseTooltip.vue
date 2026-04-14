<script setup lang="ts">
defineProps<{
  content: string
}>()
</script>

<template>
  <div class="relative inline-flex group">
    <slot />
    <div class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 rounded bg-ink px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap z-50">
      {{ content }}
    </div>
  </div>
</template>
