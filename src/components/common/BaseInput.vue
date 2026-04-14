<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
}>(), {
  modelValue: '',
  placeholder: '',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    :placeholder="placeholder"
    class="rounded-md border border-surface-border bg-white px-3 py-1.5 text-sm text-ink placeholder:text-ink-disabled focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
