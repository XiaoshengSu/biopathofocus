<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { typingApi } from '@/api/typing'
import DataTable from '@/components/table/DataTable.vue'
import BasePagination from '@/components/common/BasePagination.vue'
import type { Column } from '@/types/api'
import type { MlstRow } from '@/types/typing'

const columns: Column[] = [
  { key: 'sampleId', label: '样本编号', width: 140 },
  { key: 'sampleName', label: '样本名称', width: 120 },
  { key: 'scheme', label: 'Scheme', width: 160 },
  { key: 'st', label: 'ST', width: 80, sortable: true },
]

const data = ref<MlstRow[]>([])
const loading = ref(false)
const pagination = ref({ page: 1, pageSize: 20, total: 0 })

async function loadData() {
  loading.value = true
  try {
    const res = await typingApi.getMlstList({ st: '', page: pagination.value.page, pageSize: pagination.value.pageSize })
    data.value = res.data.list
    pagination.value.total = res.data.total
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>

<template>
  <div class="space-y-4">
    <DataTable :columns="columns" :data="data" :loading="loading" max-height="500px" />
    <div class="flex justify-end">
      <BasePagination :page="pagination.page" :page-size="pagination.pageSize" :total="pagination.total" @update:page="p => { pagination.page = p; loadData() }" />
    </div>
  </div>
</template>
