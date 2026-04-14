<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useECharts } from '@/composables/useECharts'

const props = withDefaults(defineProps<{
  data: { name: string; value: number }[]
  title?: string
  horizontal?: boolean
}>(), {
  title: '',
  horizontal: false,
})

const chartRef = ref<HTMLElement | null>(null)
const { init, setOption } = useECharts(chartRef)

const option = computed(() => ({
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(255,255,255,0.95)', borderColor: '#e8ecf0', textStyle: { color: '#1f2937', fontSize: 12 } },
  grid: { left: 60, right: 30, top: props.title ? 50 : 30, bottom: 30 },
  title: props.title ? { text: props.title, left: 'center', top: 5, textStyle: { fontSize: 13, fontWeight: 600, color: '#1f2937' } } : undefined,
  xAxis: props.horizontal ? undefined : { type: 'category', data: props.data.map(d => d.name), axisLabel: { fontSize: 11, color: '#6b7280' }, axisLine: { lineStyle: { color: '#e8ecf0' } }, axisTick: { show: false } },
  yAxis: props.horizontal ? { type: 'category', data: props.data.map(d => d.name), axisLabel: { fontSize: 11, color: '#6b7280' }, axisLine: { lineStyle: { color: '#e8ecf0' } }, axisTick: { show: false } } : { type: 'value', axisLabel: { fontSize: 11, color: '#6b7280' }, splitLine: { lineStyle: { color: '#f0f0f0' } } },
  series: [{
    type: 'bar',
    data: props.data.map(d => d.value),
    itemStyle: { color: '#1890ff', borderRadius: props.horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0] },
    barMaxWidth: 32,
    emphasis: { itemStyle: { color: '#1677e6' } },
  }],
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
