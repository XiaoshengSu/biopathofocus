<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useECharts } from '@/composables/useECharts'

const props = withDefaults(defineProps<{
  data: { name: string; value: number }[]
  title?: string
}>(), {
  title: '',
})

const chartRef = ref<HTMLElement | null>(null)
const { init, setOption } = useECharts(chartRef)

const COLORS = ['#1890ff', '#FA8C16', '#52c41a', '#f5222d', '#13c2c2', '#722ed1', '#eb2f96', '#faad14']

const option = computed(() => ({
  tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)', backgroundColor: 'rgba(255,255,255,0.95)', borderColor: '#e8ecf0', textStyle: { color: '#1f2937', fontSize: 12 } },
  title: props.title ? { text: props.title, left: 'center', top: 5, textStyle: { fontSize: 13, fontWeight: 600, color: '#1f2937' } } : undefined,
  legend: { orient: 'vertical', right: 10, top: 'middle', textStyle: { fontSize: 11, color: '#6b7280' }, itemWidth: 10, itemHeight: 10, itemGap: 8 },
  color: COLORS,
  series: [{
    type: 'pie',
    radius: ['40%', '68%'],
    center: ['38%', '55%'],
    data: props.data.map((d, i) => ({ ...d, itemStyle: { color: COLORS[i % COLORS.length] } })),
    label: { show: false },
    emphasis: { label: { show: true, fontSize: 12, fontWeight: 'bold' } },
    itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
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
