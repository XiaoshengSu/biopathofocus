export interface SampleFilter {
  sampleType: string
  host: string
  country: string
  species: string
  st: string
  serotype: string
}

export type SampleFilterKey = keyof SampleFilter
