import { ref, onMounted, onUnmounted, watch, type Ref, shallowRef } from 'vue'
import * as echarts from 'echarts/core'
import { BarChart, PieChart, HeatmapChart, ScatterChart } from 'echarts/charts'
import {
  TitleComponent, TooltipComponent, LegendComponent, GridComponent,
  VisualMapComponent, ToolboxComponent, DataZoomComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  BarChart, PieChart, HeatmapChart, ScatterChart,
  TitleComponent, TooltipComponent, LegendComponent, GridComponent,
  VisualMapComponent, ToolboxComponent, DataZoomComponent,
  CanvasRenderer,
])

export function useECharts(chartRef: Ref<HTMLElement | null>) {
  const chartInstance = shallowRef<echarts.ECharts>()
  let resizeObserver: ResizeObserver | null = null

  function init(option: echarts.EChartsOption) {
    if (!chartRef.value) return
    chartInstance.value = echarts.init(chartRef.value)
    chartInstance.value.setOption(option)

    // Use ResizeObserver to respond to container size changes (e.g., sidebar collapse)
    resizeObserver = new ResizeObserver(() => {
      chartInstance.value?.resize()
    })
    resizeObserver.observe(chartRef.value)
  }

  function setOption(option: echarts.EChartsOption) {
    chartInstance.value?.setOption(option, { notMerge: true })
  }

  function getInstance() {
    return chartInstance.value
  }

  onUnmounted(() => {
    resizeObserver?.disconnect()
    chartInstance.value?.dispose()
  })

  return { init, setOption, getInstance }
}
