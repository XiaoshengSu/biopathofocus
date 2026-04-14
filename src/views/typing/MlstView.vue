<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { typingApi } from '@/api/typing'
import DataTable from '@/components/table/DataTable.vue'
import BasePagination from '@/components/common/BasePagination.vue'
import PieChart from '@/components/chart/PieChart.vue'
import BaseTabs from '@/components/common/BaseTabs.vue'
import FilterBar from '@/components/filter/FilterBar.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import type { Column } from '@/types/api'
import type { MlstRow } from '@/types/typing'

const viewMode = ref('table')
const stFilter = ref('')
const data = ref<MlstRow[]>([])
const pieData = ref<{ name: string; value: number }[]>([])
const loading = ref(false)
const pagination = ref({ page: 1, pageSize: 20, total: 0 })

const columns: Column[] = [
  { key: 'sampleId', label: '样本编号', width: 140 },
  { key: 'sampleName', label: '样本名称', width: 120 },
  { key: 'scheme', label: 'Scheme', width: 160 },
  { key: 'st', label: 'ST', width: 80, sortable: true },
]

async function loadData() {
  loading.value = true
  try {
    if (viewMode.value === 'table') {
      const res = await typingApi.getMlstList({ st: stFilter.value, page: pagination.value.page, pageSize: pagination.value.pageSize })
      data.value = res.data.list
      pagination.value.total = res.data.total
    } else {
      const res = await typingApi.getMlstPie({ st: stFilter.value })
      pieData.value = res.data
    }
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center gap-4">
      <BaseTabs :tabs="[{ key: 'table', label: '详情表' }, { key: 'pie', label: '饼图' }]" :model-value="viewMode" @update:model-value="v => { viewMode = v; loadData() }" />
    </div>

    <FilterBar @search="loadData" @reset="() => { stFilter = ''; loadData() }">
      <BaseInput v-model="stFilter" placeholder="ST 型筛选" />
    </FilterBar>

    <div v-if="viewMode === 'table'">
      <DataTable :columns="columns" :data="data" :loading="loading" max-height="500px" />
      <div class="flex justify-end mt-4">
        <BasePagination :page="pagination.page" :page-size="pagination.pageSize" :total="pagination.total" @update:page="p => { pagination.page = p; loadData() }" />
      </div>
    </div>
    <div v-else class="rounded-lg border border-surface-border bg-surface p-4 shadow-sm">
      <div class="h-80">
        <PieChart :data="pieData" title="ST 型分布" />
      </div>
    </div>
  </div>
</template>
