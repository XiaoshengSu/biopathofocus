<script setup lang="ts">
defineProps<{
  visible: boolean
  title?: string
}>()

defineEmits<{
  'update:visible': [value: boolean]
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/30" @click="$emit('update:visible', false)" />
      <div class="relative z-10 w-full max-w-lg rounded-lg bg-surface shadow-dropdown">
        <div v-if="title" class="flex items-center justify-between border-b border-surface-border px-5 py-3">
          <h3 class="text-sm font-semibold text-ink">{{ title }}</h3>
          <button class="text-ink-disabled hover:text-ink" @click="$emit('update:visible', false)">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-5">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
