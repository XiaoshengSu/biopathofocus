export interface GeoDistribution {
  country: string
  value: number
  coordinates: [number, number]
}

export interface TimelineData {
  year: number
  count: number
}

export interface PieDataItem {
  name: string
  value: number
}

export interface AttributeStats {
  attributeName: string
  items: { name: string; count: number }[]
}
