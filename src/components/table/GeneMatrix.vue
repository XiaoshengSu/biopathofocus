<script setup lang="ts">
withDefaults(defineProps<{
  genes: string[]
  samples: string[]
  matrix: number[][]
}>(), {
  genes: () => [],
  samples: () => [],
  matrix: () => [],
})
</script>

<template>
  <div class="overflow-auto rounded-lg border border-surface-border" style="max-height: 500px;">
    <table class="w-full text-xs">
      <thead class="sticky top-0 z-10 bg-surface-header">
        <tr>
          <th class="sticky left-0 z-20 min-w-[120px] border-b border-r border-surface-border bg-surface-header px-2 py-2 text-left font-medium text-ink-secondary">
            Gene / Sample
          </th>
          <th
            v-for="sample in samples"
            :key="sample"
            class="min-w-[60px] border-b border-surface-border px-2 py-2 text-left font-medium text-ink-secondary whitespace-nowrap"
          >
            {{ sample }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!genes.length">
          <td :colspan="samples.length + 1" class="px-3 py-8 text-center text-ink-disabled">
            暂无数据
          </td>
        </tr>
        <tr
          v-for="(gene, gi) in genes"
          :key="gene"
          class="border-b border-surface-border last:border-0 hover:bg-surface-hover transition-colors"
        >
          <td class="sticky left-0 z-10 border-r border-surface-border bg-white px-2 py-1.5 font-medium text-ink whitespace-nowrap">
            {{ gene }}
          </td>
          <td
            v-for="(sample, si) in samples"
            :key="`${gene}-${sample}`"
            class="px-2 py-1.5 text-center"
            :class="matrix[gi]?.[si] ? 'bg-primary-100 text-primary-700 font-medium' : 'text-ink-disabled'"
          >
            {{ matrix[gi]?.[si] || 0 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
