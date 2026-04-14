<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md'
}>(), {
  variant: 'primary',
  size: 'md',
})
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      variant === 'primary'
        ? 'bg-primary-500 px-4 py-2 text-sm text-white hover:bg-primary-600'
        : 'px-3 py-1.5 text-sm text-ink-secondary hover:bg-surface-hover hover:text-ink',
      size === 'sm' ? 'text-xs' : '',
    ]"
  >
    <slot />
  </button>
</template>
