<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NAV_ITEMS } from '@/utils/constants'

const props = defineProps<{ collapsed: boolean }>()

const route = useRoute()
const router = useRouter()

function isActive(path: string): boolean {
  return route.path.startsWith(path)
}

function navigate(path: string) {
  router.push(path)
}
</script>

<template>
  <aside
    class="flex flex-col border-r border-surface-border bg-surface transition-all duration-300 ease-in-out shrink-0"
    :class="collapsed ? 'w-14' : 'w-52'"
  >
    <!-- Navigation section -->
    <div class="border-b border-surface-border px-2 py-3">
      <p v-if="!collapsed" class="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-ink-disabled">
        功能导航
      </p>
      <nav class="space-y-0.5">
        <button
          v-for="item in NAV_ITEMS"
          :key="item.key"
          class="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-all duration-150"
          :class="[
            isActive(item.path)
              ? 'bg-primary-50 text-primary-600 font-medium shadow-sm shadow-primary-100'
              : 'text-ink-secondary hover:bg-surface-muted hover:text-ink',
            collapsed ? 'justify-center' : '',
          ]"
          :title="collapsed ? item.label : undefined"
          @click="navigate(item.path)"
        >
          <span class="shrink-0 text-[15px]">
            {{ item.icon === 'dashboard' ? '📊' : item.icon === 'sample' ? '📋' : item.icon === 'typing' ? '🔬' : item.icon === 'amr' ? '💊' : item.icon === 'vf' ? '🧬' : '🌳' }}
          </span>
          <span v-if="!collapsed" class="truncate">{{ item.label }}</span>
        </button>
      </nav>
    </div>

    <!-- Quick filters section (placeholder for future) -->
    <div class="flex-1 overflow-y-auto px-2 py-3">
      <p v-if="!collapsed" class="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-ink-disabled">
        快捷操作
      </p>
      <div v-if="!collapsed" class="space-y-1">
        <button class="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-ink-secondary hover:bg-surface-muted hover:text-ink transition-colors">
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          <span>数据筛选</span>
        </button>
        <button class="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-ink-secondary hover:bg-surface-muted hover:text-ink transition-colors">
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          <span>导出数据</span>
        </button>
        <button class="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-ink-secondary hover:bg-surface-muted hover:text-ink transition-colors">
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>分析历史</span>
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="border-t border-surface-border px-2 py-2">
      <div v-if="!collapsed" class="flex items-center justify-between px-2">
        <span class="text-[10px] text-ink-disabled">v1.0.0</span>
        <span class="text-[10px] text-ink-disabled">Mock 模式</span>
      </div>
    </div>
  </aside>
</template>
