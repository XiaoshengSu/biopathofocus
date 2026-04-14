<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { dashboardApi } from '@/api/dashboard'
import type { GeoDistribution, TimelineData, PieDataItem, AttributeStats } from '@/types/dashboard'
import BarChart from '@/components/chart/BarChart.vue'
import PieChart from '@/components/chart/PieChart.vue'
import ChartContainer from '@/components/chart/ChartContainer.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseLoading from '@/components/common/BaseLoading.vue'

const loading = ref(true)
const geoData = ref<GeoDistribution[]>([])
const timelineData = ref<TimelineData[]>([])
const countryPieData = ref<PieDataItem[]>([])
const amrStats = ref<PieDataItem[]>([])
const vfStats = ref<PieDataItem[]>([])
const attrStats = ref<AttributeStats[]>([])

const mapOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => `${params.name}<br/>菌株数: ${params.value[2]}`,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#e8ecf0',
    textStyle: { color: '#1f2937', fontSize: 12 },
  },
  xAxis: { min: -180, max: 180, show: false },
  yAxis: { min: -60, max: 80, show: false },
  grid: { left: 10, right: 10, top: 10, bottom: 10 },
  series: [{
    type: 'scatter',
    data: geoData.value.map(d => ({ name: d.country, value: [d.coordinates[0], d.coordinates[1], d.value] })),
    symbolSize: (val: number[]) => Math.max(14, Math.sqrt(val[2]) * 4),
    itemStyle: { color: '#1890ff', shadowBlur: 8, shadowColor: 'rgba(24,144,255,0.25)' },
    label: { show: true, formatter: '{b}', position: 'right', fontSize: 11, color: '#6b7280' },
    emphasis: { itemStyle: { color: '#1677e6', shadowBlur: 12 } },
  }],
}))

onMounted(async () => {
  loading.value = true
  try {
    const [geo, timeline, pie, amr, vf, attrs] = await Promise.all([
      dashboardApi.getGeoDistribution(),
      dashboardApi.getTimeline(),
      dashboardApi.getCountryPie(),
      dashboardApi.getAmrStats(),
      dashboardApi.getVfStats(),
      dashboardApi.getAttributeStats(),
    ])
    geoData.value = geo.data
    timelineData.value = timeline.data
    countryPieData.value = pie.data
    amrStats.value = amr.data
    vfStats.value = vf.data
    attrStats.value = attrs.data
  } catch (e) {
    console.error('Dashboard load failed:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="p-5 space-y-5">
    <BaseLoading v-if="loading" text="加载概览数据..." />

    <template v-else>
      <!-- Summary stats row -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="stat in [
          { label: '总样本数', value: '158', icon: '📋', color: 'text-primary-500' },
          { label: '覆盖国家', value: '7', icon: '🌍', color: 'text-success-500' },
          { label: '耐药基因', value: '35', icon: '💊', color: 'text-danger-500' },
          { label: '毒力基因', value: '28', icon: '🧬', color: 'text-info-500' },
        ]" :key="stat.label"
          class="flex items-center gap-3 rounded-lg border border-surface-border bg-surface p-4 shadow-sm"
        >
          <span class="text-2xl">{{ stat.icon }}</span>
          <div>
            <p class="text-[11px] text-ink-secondary">{{ stat.label }}</p>
            <p class="text-xl font-bold text-ink">{{ stat.value }}</p>
          </div>
        </div>
      </div>

      <!-- Top row: Map + Bar -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BaseCard title="全球菌株地理分布">
          <div class="h-72">
            <ChartContainer :option="mapOption" auto-resize />
          </div>
        </BaseCard>
        <BaseCard title="菌株时间分布">
          <div class="h-72">
            <BarChart :data="timelineData.map(d => ({ name: String(d.year), value: d.count }))" />
          </div>
        </BaseCard>
      </div>

      <!-- Second row: Pie charts -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <BaseCard title="国家分布">
          <div class="h-60">
            <PieChart :data="countryPieData" />
          </div>
        </BaseCard>
        <BaseCard title="耐药基因统计">
          <div class="h-60">
            <PieChart :data="amrStats" />
          </div>
        </BaseCard>
        <BaseCard title="毒力基因统计">
          <div class="h-60">
            <PieChart :data="vfStats" />
          </div>
        </BaseCard>
      </div>

      <!-- Third row: Attribute stats -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <BaseCard v-for="attr in attrStats" :key="attr.attributeName" :title="attr.attributeName">
          <div class="space-y-2.5">
            <div v-for="item in attr.items.slice(0, 8)" :key="item.name" class="flex items-center justify-between">
              <span class="text-xs text-ink-secondary">{{ item.name }}</span>
              <div class="flex items-center gap-2">
                <div class="h-1.5 w-20 rounded-full bg-surface-muted overflow-hidden">
                  <div class="h-full rounded-full bg-primary-400" :style="{ width: Math.min(100, (item.count / 85) * 100) + '%' }" />
                </div>
                <span class="text-xs font-semibold text-ink w-8 text-right">{{ item.count }}</span>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </template>
  </div>
</template>
