<script setup lang="ts">
withDefaults(defineProps<{
  tabs: { key: string; label: string }[]
  modelValue: string
}>(), {})

defineEmits<{
  'update:modelValue': [key: string]
}>()
</script>

<template>
  <div class="flex gap-1 border-b border-surface-border">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      :class="[
        'px-4 py-2 text-sm transition-colors',
        modelValue === tab.key
          ? 'border-b-2 border-primary-500 font-medium text-primary-500'
          : 'text-ink-secondary hover:text-ink'
      ]"
      @click="$emit('update:modelValue', tab.key)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
