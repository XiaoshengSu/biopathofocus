<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseTabs from '@/components/common/BaseTabs.vue'

const route = useRoute()
const router = useRouter()

const tabs = [
  { key: 'csv', label: 'CSV' },
  { key: 'mlst', label: 'MLST' },
  { key: 'cgmlst', label: 'cgMLST' },
  { key: 'antigen', label: '血清抗原' },
]

const activeTab = ref('csv')

watch(() => route.path, (path) => {
  const tab = tabs.find(t => path.includes(t.key))
  if (tab) activeTab.value = tab.key
}, { immediate: true })

function onTabChange(key: string) {
  router.push(`/sample/${key}`)
}
</script>

<template>
  <div class="p-5 space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-base font-semibold text-ink">样本信息</h1>
      <span class="text-xs text-ink-disabled">浏览和管理所有菌株样本数据</span>
    </div>
    <BaseTabs :tabs="tabs" :model-value="activeTab" @update:model-value="onTabChange" />
    <router-view />
  </div>
</template>
