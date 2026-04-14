export interface AmrGeneRow {
  geneId: string
  geneName: string
  category: string
  resistanceRate: number
  samples: Record<string, number>
}

export interface AmrStats {
  categories: { name: string; count: number; rate: number }[]
  topGenes: { name: string; rate: number }[]
}
