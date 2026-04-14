<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { typingApi } from '@/api/typing'
import GeneMatrix from '@/components/table/GeneMatrix.vue'
import BaseLoading from '@/components/common/BaseLoading.vue'
import type { CgmlstRow } from '@/types/typing'

const genes = ref<string[]>([])
const samples = ref<string[]>([])
const matrix = ref<number[][]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const res = await typingApi.getCgmlstList({ page: 1, pageSize: 50 })
    const list = res.data.list
    if (list.length > 0) {
      genes.value = Object.keys(list[0].alleles)
      samples.value = list.map(r => r.sampleId)
      matrix.value = list.map(r => genes.value.map(g => r.alleles[g] || 0))
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <BaseLoading v-if="loading" text="加载 cgMLST 数据..." />
    <GeneMatrix v-else :genes="genes" :samples="samples" :matrix="matrix" />
  </div>
</template>
