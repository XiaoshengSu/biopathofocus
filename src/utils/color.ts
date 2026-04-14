const CHART_COLORS = [
  '#1890ff', '#FA8C16', '#52c41a', '#f5222d', '#13c2c2',
  '#722ed1', '#eb2f96', '#faad14', '#2f54eb', '#a0d911',
]

export function getChartColor(index: number): string {
  return CHART_COLORS[index % CHART_COLORS.length]
}

export function getChartColors(count: number): string[] {
  return Array.from({ length: count }, (_, i) => getChartColor(i))
}
