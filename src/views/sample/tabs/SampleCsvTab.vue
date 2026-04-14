<script setup lang="ts">
import { onMounted } from 'vue'
import { sampleApi } from '@/api/sample'
import { useTable } from '@/composables/useTable'
import { useSampleStore } from '@/stores/sample'
import DataTable from '@/components/table/DataTable.vue'
import BasePagination from '@/components/common/BasePagination.vue'
import FilterBar from '@/components/filter/FilterBar.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseTag from '@/components/common/BaseTag.vue'
import { SAMPLE_TYPE_OPTIONS, HOST_OPTIONS } from '@/utils/constants'
import type { Column } from '@/types/api'
import { formatDate } from '@/utils/format'

const store = useSampleStore()

const columns: Column[] = [
  { key: 'id', label: '样本编号', width: 140, sortable: true },
  { key: 'name', label: '样本名称', width: 120 },
  { key: 'type', label: '样本类型', width: 100 },
  { key: 'species', label: '分离菌', width: 200 },
  { key: 'st', label: 'ST 型', width: 80, sortable: true },
  { key: 'serotype', label: '血清型', width: 100 },
  { key: 'host', label: '宿主', width: 100 },
  { key: 'country', label: '采样国家', width: 120 },
  { key: 'isolationDate', label: '分离时间', width: 120, sortable: true },
  { key: 'institution', label: '分离机构', width: 150 },
]

const { data, loading, pagination, loadData, changePage } = useTable(
  (params) => sampleApi.getList(params),
  {} as any,
)

function onSearch() {
  loadData(store.filters as any)
}

function onReset() {
  store.resetFilters()
  loadData({})
}

function removeFilter(key: string) {
  store.setFilter(key as any, '')
  onSearch()
}

onMounted(() => loadData())
</script>

<template>
  <div class="space-y-4">
    <!-- Active filters -->
    <div v-if="store.activeFilterTags.length" class="flex flex-wrap gap-2">
      <BaseTag
        v-for="tag in store.activeFilterTags"
        :key="tag.key"
        :label="`${tag.label}: ${tag.value}`"
        closable
        @close="removeFilter(tag.key)"
      />
    </div>

    <!-- Filter bar -->
    <FilterBar @search="onSearch" @reset="onReset">
      <BaseSelect :options="SAMPLE_TYPE_OPTIONS" :model-value="store.filters.sampleType" placeholder="样本类型" @update:model-value="store.setFilter('sampleType', $event)" />
      <BaseSelect :options="HOST_OPTIONS" :model-value="store.filters.host" placeholder="宿主" @update:model-value="store.setFilter('host', $event)" />
      <BaseInput :model-value="store.filters.country" placeholder="采样国家" @update:model-value="store.setFilter('country', $event)" />
      <BaseInput :model-value="store.filters.species" placeholder="分离菌" @update:model-value="store.setFilter('species', $event)" />
    </FilterBar>

    <!-- Table -->
    <DataTable :columns="columns" :data="data" :loading="loading" max-height="500px">
      <template #isolationDate="{ value }">{{ formatDate(value) }}</template>
    </DataTable>

    <!-- Pagination -->
    <div class="flex justify-end">
      <BasePagination :page="pagination.page" :page-size="pagination.pageSize" :total="pagination.total" @update:page="changePage" />
    </div>
  </div>
</template>
