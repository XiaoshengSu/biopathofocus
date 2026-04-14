import { http, HttpResponse } from 'msw'

const treeData = {
  nodes: Array.from({ length: 10 }, (_, i) => ({
    id: `node_${i + 1}`,
    name: `Sample_${i + 1}`,
    parent: i === 0 ? null : `node_${Math.ceil(i / 2)}`,
    distance: i === 0 ? 0 : Number((Math.random() * 3 + 0.5).toFixed(2)),
    metadata: { country: ['China', 'USA', 'India', 'UK', 'Japan'][i % 5], st: [1, 2, 3, 101, 208][i % 5] },
  })),
  links: Array.from({ length: 9 }, (_, i) => ({
    source: `node_${Math.ceil((i + 1) / 2)}`,
    target: `node_${i + 2}`,
    distance: Number((Math.random() * 3 + 0.5).toFixed(2)),
  })),
}

const heatmapCells = [
  { row: 'Sample_1', col: 'Country', value: 1 },
  { row: 'Sample_2', col: 'Country', value: 1 },
  { row: 'Sample_3', col: 'Country', value: 0 },
  { row: 'Sample_1', col: 'ST', value: 1 },
  { row: 'Sample_2', col: 'ST', value: 0 },
  { row: 'Sample_3', col: 'ST', value: 1 },
  { row: 'Sample_4', col: 'Country', value: 1 },
  { row: 'Sample_4', col: 'ST', value: 1 },
  { row: 'Sample_5', col: 'Country', value: 0 },
  { row: 'Sample_5', col: 'ST', value: 0 },
]

export const treeHandlers = [
  http.get('/api/tree-heatmap/data', () => HttpResponse.json({ code: 0, message: 'ok', data: treeData })),
  http.get('/api/tree-heatmap/config', () => HttpResponse.json({ code: 0, message: 'ok', data: { markerField: 'country', mlstScheme: 'abaumannii', samples: treeData.nodes.map(n => n.name), genes: ['geneA', 'geneB', 'geneC'] } })),
  http.get('/api/tree-heatmap/heatmap', () => HttpResponse.json({ code: 0, message: 'ok', data: heatmapCells })),
]
