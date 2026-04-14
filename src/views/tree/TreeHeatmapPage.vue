<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { treeApi } from '@/api/tree'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseLoading from '@/components/common/BaseLoading.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import HeatmapChart from '@/components/chart/HeatmapChart.vue'
import type { TreeData, HeatmapCell } from '@/types/tree'

const loading = ref(true)
const treeData = ref<TreeData | null>(null)
const heatmapCells = ref<HeatmapCell[]>([])
const xLabels = ref<string[]>([])
const yLabels = ref<string[]>([])
const heatmapData = ref<[number, number, number][]>([])

onMounted(async () => {
  loading.value = true
  try {
    const [treeRes, heatRes] = await Promise.all([
      treeApi.getData(),
      treeApi.getHeatmap(),
    ])
    treeData.value = treeRes.data
    heatmapCells.value = heatRes.data

    const cols = new Set<string>()
    const rows = new Set<string>()
    heatmapCells.value.forEach(c => { cols.add(c.col); rows.add(c.row) })
    xLabels.value = Array.from(cols)
    yLabels.value = Array.from(rows)
    heatmapData.value = heatmapCells.value.map(c => [
      yLabels.value.indexOf(c.row),
      xLabels.value.indexOf(c.col),
      typeof c.value === 'number' ? c.value : 1,
    ])
  } catch (e) {
    console.error('Tree Heatmap load failed:', e)
  } finally {
    loading.value = false
  }
})

function exportSvg() {
  const svgEl = document.querySelector('#tree-heatmap svg')
  if (!svgEl) return
  const data = new XMLSerializer().serializeToString(svgEl)
  const blob = new Blob([data], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'tree-heatmap.svg'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="p-5 space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-base font-semibold text-ink">MLST 最小生成树</h1>
        <p class="text-xs text-ink-disabled mt-0.5">系统发育树与元数据热图联合分析</p>
      </div>
      <div class="flex gap-2">
        <BaseButton variant="ghost" size="sm" @click="exportSvg">导出 SVG</BaseButton>
        <BaseButton variant="ghost" size="sm">导出 PNG</BaseButton>
        <BaseButton variant="ghost" size="sm">导出数据</BaseButton>
      </div>
    </div>

    <BaseLoading v-if="loading" text="加载 Tree Heatmap..." />

    <div v-else id="tree-heatmap" class="grid grid-cols-1 xl:grid-cols-4 gap-5">
      <!-- Config panel -->
      <BaseCard title="分析配置" class="xl:col-span-1">
        <div class="space-y-4">
          <div>
            <label class="block text-[11px] font-medium text-ink-secondary mb-1.5">标记信息</label>
            <select class="w-full rounded-md border border-surface-border bg-surface px-3 py-1.5 text-xs text-ink outline-none focus:border-primary-400">
              <option>默认国家</option>
              <option>ST 型</option>
              <option>宿主</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-medium text-ink-secondary mb-1.5">MLST Scheme</label>
            <input type="text" class="w-full rounded-md border border-surface-border bg-surface px-3 py-1.5 text-xs text-ink outline-none focus:border-primary-400" value="abaumannii" />
          </div>
          <div>
            <label class="block text-[11px] font-medium text-ink-secondary mb-1.5">样本范围</label>
            <button class="w-full text-left rounded-md border border-surface-border px-3 py-1.5 text-xs text-primary-500 hover:bg-primary-50 transition-colors">显示全部样本</button>
          </div>
          <div>
            <label class="block text-[11px] font-medium text-ink-secondary mb-1.5">基因范围</label>
            <button class="w-full text-left rounded-md border border-surface-border px-3 py-1.5 text-xs text-primary-500 hover:bg-primary-50 transition-colors">显示全部基因</button>
          </div>
          <div class="pt-2 border-t border-surface-border">
            <button class="w-full rounded-md bg-primary-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-600 transition-colors">应用配置</button>
          </div>
        </div>
      </BaseCard>

      <!-- Heatmap -->
      <div class="xl:col-span-3">
        <BaseCard :padding="false">
          <div class="h-[500px]">
            <HeatmapChart
              v-if="heatmapData.length"
              :x-labels="xLabels"
              :y-labels="yLabels"
              :data="heatmapData"
              title="基因分布热图"
            />
            <div v-else class="flex h-full items-center justify-center text-sm text-ink-disabled">
              暂无热图数据
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
