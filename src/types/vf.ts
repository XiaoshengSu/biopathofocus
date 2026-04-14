export interface VfGeneRow {
  geneId: string
  geneName: string
  category: string
  coverage: number
  samples: Record<string, number>
}

export interface VfStats {
  categories: { name: string; count: number; coverage: number }[]
  topGenes: { name: string; coverage: number }[]
}
