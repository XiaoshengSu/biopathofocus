<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useECharts } from '@/composables/useECharts'

const props = defineProps<{
  option: echarts.EChartsOption
  autoResize?: boolean
}>()

const chartRef = ref<HTMLElement | null>(null)
const { init, setOption } = useECharts(chartRef)

let initialized = false

watch(() => props.option, (opt) => {
  if (!initialized) {
    nextTick(() => {
      init(opt)
      initialized = true
    })
  } else {
    setOption(opt)
  }
}, { deep: true, immediate: true })
</script>

<template>
  <div ref="chartRef" class="h-full w-full min-h-0" />
</template>
