export interface MlstRow {
  sampleId: string
  sampleName: string
  scheme: string
  st: number
  genes: Record<string, number>
}

export interface CgmlstRow {
  sampleId: string
  alleles: Record<string, number>
}

export interface AntigenRow {
  sampleId: string
  kType: string
  oType: string
  hType: string
}
