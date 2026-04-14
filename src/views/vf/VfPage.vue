<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { vfApi } from '@/api/vf'
import GeneMatrix from '@/components/table/GeneMatrix.vue'
import BaseTabs from '@/components/common/BaseTabs.vue'
import FilterBar from '@/components/filter/FilterBar.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BasePagination from '@/components/common/BasePagination.vue'
import BaseLoading from '@/components/common/BaseLoading.vue'
import BarChart from '@/components/chart/BarChart.vue'
import type { VfStats } from '@/types/vf'
import type { SelectOption } from '@/types/api'

const viewMode = ref('table')
const vfCategory = ref('')
const vfGene = ref('')
const categoryOptions = ref<SelectOption[]>([])

const genes = ref<string[]>([])
const samples = ref<string[]>([])
const matrix = ref<number[][]>([])
const loading = ref(false)
const pagination = ref({ page: 1, pageSize: 20, total: 0 })
const stats = ref<VfStats | null>(null)

async function loadData() {
  loading.value = true
  try {
    if (viewMode.value === 'table') {
      const res = await vfApi.getMatrix({ vfCategory: vfCategory.value, vfGene: vfGene.value, page: pagination.value.page, pageSize: pagination.value.pageSize })
      const list = res.data.list
      genes.value = list.map(g => g.geneName)
      samples.value = list.length > 0 ? Object.keys(list[0].samples) : []
      matrix.value = list.map(g => samples.value.map(s => g.samples[s] || 0))
      pagination.value.total = res.data.total
    } else {
      const res = await vfApi.getStats({ vfCategory: vfCategory.value })
      stats.value = res.data
    }
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    const res = await vfApi.getCategories()
    categoryOptions.value = [{ label: '全部', value: '' }, ...res.data]
  } catch { /* ignore */ }
  loadData()
})
</script>

<template>
  <div class="p-5 space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-base font-semibold text-ink">毒力基因信息</h1>
      <span class="text-xs text-ink-disabled">Virulence Factor Gene Analysis</span>
    </div>

    <div class="flex items-center gap-4">
      <BaseTabs :tabs="[{ key: 'table', label: '详情表' }, { key: 'chart', label: '统计图' }]" :model-value="viewMode" @update:model-value="v => { viewMode = v; loadData() }" />
    </div>

    <FilterBar @search="loadData" @reset="() => { vfCategory = ''; vfGene = ''; loadData() }">
      <BaseSelect :options="categoryOptions" :model-value="vfCategory" placeholder="VF 类别" @update:model-value="vfCategory = $event" />
      <BaseInput v-model="vfGene" placeholder="VF 基因" />
    </FilterBar>

    <BaseLoading v-if="loading" />
    <template v-else>
      <GeneMatrix v-if="viewMode === 'table'" :genes="genes" :samples="samples" :matrix="matrix" />
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="rounded-lg border border-surface-border bg-surface p-4 shadow-sm">
          <div class="h-72">
            <BarChart v-if="stats?.categories" :data="stats.categories.map(c => ({ name: c.name, value: c.count }))" title="VF 类别分布" />
          </div>
        </div>
        <div class="rounded-lg border border-surface-border bg-surface p-4 shadow-sm">
          <div class="h-72">
            <BarChart v-if="stats?.topGenes" :data="stats.topGenes.map(g => ({ name: g.name, value: Math.round(g.coverage * 100) }))" title="Top 毒力基因覆盖率 (%)" />
          </div>
        </div>
      </div>
    </template>

    <div v-if="viewMode === 'table'" class="flex justify-end">
      <BasePagination :page="pagination.page" :page-size="pagination.pageSize" :total="pagination.total" @update:page="p => { pagination.page = p; loadData() }" />
    </div>
  </div>
</template>
