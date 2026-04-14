<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useECharts } from '@/composables/useECharts'

const props = withDefaults(defineProps<{
  xLabels: string[]
  yLabels: string[]
  data: [number, number, number][]
  title?: string
}>(), {
  title: '',
})

const chartRef = ref<HTMLElement | null>(null)
const { init, setOption } = useECharts(chartRef)

const option = computed(() => ({
  tooltip: { position: 'top', backgroundColor: 'rgba(255,255,255,0.95)', borderColor: '#e8ecf0', textStyle: { color: '#1f2937', fontSize: 12 } },
  grid: { left: 100, right: 60, top: props.title ? 50 : 30, bottom: 50 },
  title: props.title ? { text: props.title, left: 'center', top: 5, textStyle: { fontSize: 13, fontWeight: 600, color: '#1f2937' } } : undefined,
  xAxis: { type: 'category', data: props.xLabels, splitArea: { show: true }, axisLabel: { fontSize: 10, color: '#6b7280', rotate: 45 } },
  yAxis: { type: 'category', data: props.yLabels, splitArea: { show: true }, axisLabel: { fontSize: 10, color: '#6b7280' } },
  visualMap: { min: 0, max: 1, calculable: true, orient: 'horizontal', left: 'center', bottom: 0, inRange: { color: ['#f0f5ff', '#1890ff'] }, textStyle: { fontSize: 11, color: '#6b7280' } },
  series: [{ type: 'heatmap', data: props.data, label: { show: false }, emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.3)' } } }],
}))

let initialized = false
watch(option, (opt) => {
  if (!initialized) {
    nextTick(() => { init(opt); initialized = true })
  } else {
    setOption(opt)
  }
}, { deep: true, immediate: true })
</script>

<template>
  <div ref="chartRef" class="h-full w-full min-h-0" />
</template>
