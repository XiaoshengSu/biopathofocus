export interface TreeNode {
  id: string
  name: string
  parent: string | null
  distance: number
  metadata: {
    country: string
    st: number
  }
}

export interface TreeLink {
  source: string
  target: string
  distance: number
}

export interface TreeData {
  nodes: TreeNode[]
  links: TreeLink[]
}

export interface HeatmapCell {
  row: string
  col: string
  value: number | string
}
