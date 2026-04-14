<script setup lang="ts">
import TheHeader from './TheHeader.vue'
import TheSidebar from './TheSidebar.vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden bg-surface-muted">
    <!-- Top bar: full width -->
    <TheHeader @toggle-sidebar="appStore.toggleSidebar" />

    <div class="flex flex-1 overflow-hidden">
      <!-- Left sidebar -->
      <TheSidebar :collapsed="appStore.sidebarCollapsed" />

      <!-- Main content area -->
      <main class="flex-1 overflow-auto bg-surface-muted">
        <router-view />
      </main>
    </div>
  </div>
</template>
