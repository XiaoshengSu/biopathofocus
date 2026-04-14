<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { typingApi } from '@/api/typing'
import DataTable from '@/components/table/DataTable.vue'
import BasePagination from '@/components/common/BasePagination.vue'
import FilterBar from '@/components/filter/FilterBar.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import type { Column } from '@/types/api'
import type { AntigenRow } from '@/types/typing'

const kType = ref('')
const oType = ref('')
const hType = ref('')

const columns: Column[] = [
  { key: 'sampleId', label: '样本编号', width: 140 },
  { key: 'kType', label: 'K-type', width: 120 },
  { key: 'oType', label: 'O-type', width: 120 },
  { key: 'hType', label: 'H-type', width: 120 },
]

const data = ref<AntigenRow[]>([])
const loading = ref(false)
const pagination = ref({ page: 1, pageSize: 20, total: 0 })

async function loadData() {
  loading.value = true
  try {
    const res = await typingApi.getAntigenList({ kType: kType.value, oType: oType.value, hType: hType.value, page: pagination.value.page, pageSize: pagination.value.pageSize })
    data.value = res.data.list
    pagination.value.total = res.data.total
  } finally {
    loading.value = false
  }
}

function onReset() {
  kType.value = ''
  oType.value = ''
  hType.value = ''
  loadData()
}

onMounted(loadData)
</script>

<template>
  <div class="space-y-4">
    <FilterBar @search="loadData" @reset="onReset">
      <BaseInput v-model="kType" placeholder="K-type" />
      <BaseInput v-model="oType" placeholder="O-type" />
      <BaseInput v-model="hType" placeholder="H-type" />
    </FilterBar>
    <DataTable :columns="columns" :data="data" :loading="loading" max-height="500px" />
    <div class="flex justify-end">
      <BasePagination :page="pagination.page" :page-size="pagination.pageSize" :total="pagination.total" @update:page="p => { pagination.page = p; loadData() }" />
    </div>
  </div>
</template>
