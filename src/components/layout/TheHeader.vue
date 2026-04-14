<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDatasetStore } from '@/stores/dataset'
import { NAV_ITEMS } from '@/utils/constants'

defineEmits<{ 'toggle-sidebar': [] }>()

const route = useRoute()
const router = useRouter()
const datasetStore = useDatasetStore()

const breadcrumbs = computed(() => {
  const matched = route.matched.filter(r => r.meta?.title)
  return matched.map(r => ({ label: r.meta.title as string, path: r.path }))
})

function isActive(path: string): boolean {
  return route.path.startsWith(path)
}

function navigate(path: string) {
  router.push(path)
}
</script>

<template>
  <header class="flex h-12 shrink-0 items-center justify-between border-b border-surface-border bg-surface px-4">
    <!-- Left: hamburger + logo -->
    <div class="flex items-center gap-3">
      <button
        class="flex h-8 w-8 items-center justify-center rounded-md text-ink-secondary hover:bg-surface-muted hover:text-ink transition-colors"
        @click="$emit('toggle-sidebar')"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Logo -->
      <div class="flex items-center gap-2">
        <div class="flex h-6 w-6 items-center justify-center rounded bg-primary-500 text-[10px] font-bold text-white">
          B
        </div>
        <span class="text-sm font-semibold text-ink tracking-tight">BioMe DB</span>
      </div>
    </div>

    <!-- Center: Navigation -->
    <nav class="flex items-center gap-0.5">
      <button
        v-for="item in NAV_ITEMS"
        :key="item.key"
        class="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-150"
        :class="[
          isActive(item.path)
            ? 'bg-primary-50 text-primary-600 shadow-sm shadow-primary-100'
            : 'text-ink-secondary hover:bg-surface-muted hover:text-ink',
        ]"
        @click="navigate(item.path)"
      >
        <span class="text-[13px]">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </button>
    </nav>

    <!-- Right: breadcrumb + user info -->
    <div class="flex items-center gap-3">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-1 text-xs text-ink-disabled">
        <template v-for="(crumb, idx) in breadcrumbs" :key="crumb.path">
          <svg v-if="idx > 0" class="h-3 w-3 text-ink-placeholder" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span :class="idx === breadcrumbs.length - 1 ? 'text-ink font-medium' : ''">
            {{ crumb.label }}
          </span>
        </template>
      </nav>

      <div class="h-5 w-px bg-surface-border" />

      <span class="text-xs text-ink-secondary hidden sm:inline">科研用户</span>
      <div class="h-7 w-7 rounded-full bg-primary-100 flex items-center justify-center text-[11px] font-semibold text-primary-600 ring-2 ring-primary-100">
        U
      </div>
    </div>
  </header>
</template>
