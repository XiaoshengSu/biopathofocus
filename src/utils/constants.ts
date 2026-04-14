export const NAV_ITEMS = [
  { key: 'dashboard', label: '数据集概览', path: '/dashboard', icon: '📊' },
  { key: 'sample', label: '样本信息', path: '/sample', icon: '📋' },
  { key: 'typing', label: '分型信息', path: '/typing', icon: '🔬' },
  { key: 'amr', label: '耐药基因', path: '/amr', icon: '💊' },
  { key: 'vf', label: '毒力基因', path: '/vf', icon: '🧬' },
  { key: 'tree', label: 'Tree Heatmap', path: '/tree-heatmap', icon: '🌳' },
] as const

export const SAMPLE_TYPE_OPTIONS = [
  { label: 'Clinical', value: 'Clinical' },
  { label: 'Environmental', value: 'Environmental' },
  { label: 'Food', value: 'Food' },
]

export const HOST_OPTIONS = [
  { label: 'Human', value: 'Human' },
  { label: 'Animal', value: 'Animal' },
  { label: 'Environment', value: 'Environment' },
]
