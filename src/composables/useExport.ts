import type { Ref } from 'vue'

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function useExport() {
  function exportSvg(chartRef: Ref<HTMLElement | null>, filename: string) {
    const svgEl = chartRef.value?.querySelector('svg')
    if (!svgEl) return
    const svgData = new XMLSerializer().serializeToString(svgEl)
    downloadFile(svgData, `${filename}.svg`, 'image/svg+xml')
  }

  function exportPng(getDataUrl: () => string | undefined, filename: string) {
    const url = getDataUrl()
    if (url) downloadFile(url, `${filename}.png`, 'image/png')
  }

  function exportCsv(data: Record<string, unknown>[], filename: string) {
    if (!data.length) return
    const headers = Object.keys(data[0])
    const csv = [
      headers.join(','),
      ...data.map((row) => headers.map((h) => JSON.stringify(row[h] ?? '')).join(',')),
    ].join('\n')
    downloadFile(csv, `${filename}.csv`, 'text/csv;charset=utf-8')
  }

  return { exportSvg, exportPng, exportCsv }
}
