<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { amrApi } from '@/api/amr'
import GeneMatrix from '@/components/table/GeneMatrix.vue'
import BaseTabs from '@/components/common/BaseTabs.vue'
import FilterBar from '@/components/filter/FilterBar.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BasePagination from '@/components/common/BasePagination.vue'
import BaseLoading from '@/components/common/BaseLoading.vue'
import BarChart from '@/components/chart/BarChart.vue'
import type { AmrStats } from '@/types/amr'
import type { SelectOption } from '@/types/api'

const viewMode = ref('table')
const amrClass = ref('')
const amrGene = ref('')
const classOptions = ref<SelectOption[]>([])

const genes = ref<string[]>([])
const samples = ref<string[]>([])
const matrix = ref<number[][]>([])
const loading = ref(false)
const pagination = ref({ page: 1, pageSize: 20, total: 0 })
const stats = ref<AmrStats | null>(null)

async function loadData() {
  loading.value = true
  try {
    if (viewMode.value === 'table') {
      const res = await amrApi.getMatrix({ amrClass: amrClass.value, amrGene: amrGene.value, page: pagination.value.page, pageSize: pagination.value.pageSize })
      const list = res.data.list
      genes.value = list.map(g => g.geneName)
      samples.value = list.length > 0 ? Object.keys(list[0].samples) : []
      matrix.value = list.map(g => samples.value.map(s => g.samples[s] || 0))
      pagination.value.total = res.data.total
    } else {
      const res = await amrApi.getStats({ amrClass: amrClass.value })
      stats.value = res.data
    }
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    const res = await amrApi.getClasses()
    classOptions.value = [{ label: '全部', value: '' }, ...res.data]
  } catch { /* ignore */ }
  loadData()
})
</script>

<template>
  <div class="p-5 space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-base font-semibold text-ink">耐药基因信息</h1>
      <span class="text-xs text-ink-disabled">Antimicrobial Resistance Gene Analysis</span>
    </div>

    <div class="flex items-center gap-4">
      <BaseTabs :tabs="[{ key: 'table', label: '详情表' }, { key: 'chart', label: '统计图' }]" :model-value="viewMode" @update:model-value="v => { viewMode = v; loadData() }" />
    </div>

    <FilterBar @search="loadData" @reset="() => { amrClass = ''; amrGene = ''; loadData() }">
      <BaseSelect :options="classOptions" :model-value="amrClass" placeholder="AMR 类别" @update:model-value="amrClass = $event" />
      <BaseInput v-model="amrGene" placeholder="AMR 基因" />
    </FilterBar>

    <BaseLoading v-if="loading" />
    <template v-else>
      <GeneMatrix v-if="viewMode === 'table'" :genes="genes" :samples="samples" :matrix="matrix" />
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="rounded-lg border border-surface-border bg-surface p-4 shadow-sm">
          <div class="h-72">
            <BarChart v-if="stats?.categories" :data="stats.categories.map(c => ({ name: c.name, value: c.count }))" title="AMR 类别分布" />
          </div>
        </div>
        <div class="rounded-lg border border-surface-border bg-surface p-4 shadow-sm">
          <div class="h-72">
            <BarChart v-if="stats?.topGenes" :data="stats.topGenes.map(g => ({ name: g.name, value: Math.round(g.rate * 100) }))" title="Top 耐药基因携带率 (%)" />
          </div>
        </div>
      </div>
    </template>

    <div v-if="viewMode === 'table'" class="flex justify-end">
      <BasePagination :page="pagination.page" :page-size="pagination.pageSize" :total="pagination.total" @update:page="p => { pagination.page = p; loadData() }" />
    </div>
  </div>
</template>
