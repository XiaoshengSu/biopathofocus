<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseTabs from '@/components/common/BaseTabs.vue'

const route = useRoute()
const router = useRouter()

const tabs = [
  { key: 'mlst', label: 'MLST' },
  { key: 'cgmlst', label: 'cgMLST' },
  { key: 'antigen', label: '表面抗原' },
]

const activeTab = ref('mlst')

watch(() => route.path, (path) => {
  const tab = tabs.find(t => path.includes(t.key))
  if (tab) activeTab.value = tab.key
}, { immediate: true })

function onTabChange(key: string) {
  router.push(`/typing/${key}`)
}
</script>

<template>
  <div class="p-5 space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-base font-semibold text-ink">分型信息</h1>
      <span class="text-xs text-ink-disabled">MLST / cgMLST / 血清抗原分型数据</span>
    </div>
    <BaseTabs :tabs="tabs" :model-value="activeTab" @update:model-value="onTabChange" />
    <router-view />
  </div>
</template>
