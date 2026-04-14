import { http, HttpResponse } from 'msw'

const geoData = [
  { country: 'China', value: 45, coordinates: [104.195, 35.861] },
  { country: 'USA', value: 28, coordinates: [-95.712, 37.090] },
  { country: 'India', value: 32, coordinates: [78.962, 20.593] },
  { country: 'UK', value: 15, coordinates: [-1.893, 52.486] },
  { country: 'Japan', value: 18, coordinates: [138.252, 36.204] },
  { country: 'Germany', value: 12, coordinates: [10.451, 51.165] },
  { country: 'Brazil', value: 8, coordinates: [-51.925, -14.235] },
]

const timelineData = [
  { year: 2019, count: 12 }, { year: 2020, count: 18 }, { year: 2021, count: 25 },
  { year: 2022, count: 32 }, { year: 2023, count: 38 }, { year: 2024, count: 45 },
]

const countryPie = [
  { name: 'China', value: 45 }, { name: 'India', value: 32 }, { name: 'USA', value: 28 },
  { name: 'Japan', value: 18 }, { name: 'UK', value: 15 }, { name: 'Germany', value: 12 },
]

const amrStats = [
  { name: 'Beta-lactamase', value: 35 }, { name: 'Aminoglycoside', value: 22 },
  { name: 'Carbapenemase', value: 18 }, { name: 'Phenicol', value: 12 },
  { name: 'Trimethoprim', value: 28 },
]

const vfStats = [
  { name: 'Acinetobactin', value: 30 }, { name: 'Adhesion', value: 25 },
  { name: 'Toxin', value: 15 }, { name: 'Colibactin', value: 10 },
]

const attrStats = [
  { attributeName: '宿主', items: [{ name: 'Human', count: 85 }, { name: 'Animal', count: 32 }, { name: 'Environment', count: 18 }] },
  { attributeName: '样本类型', items: [{ name: 'Clinical', count: 78 }, { name: 'Environmental', count: 35 }, { name: 'Food', count: 22 }] },
  { attributeName: '分离源', items: [{ name: 'Blood', count: 42 }, { name: 'Sputum', count: 35 }, { name: 'Urine', count: 28 }, { name: 'Wound', count: 18 }, { name: 'CSF', count: 12 }] },
]

export const dashboardHandlers = [
  http.get('/api/dashboard/geo-distribution', () => HttpResponse.json({ code: 0, message: 'ok', data: geoData })),
  http.get('/api/dashboard/timeline', () => HttpResponse.json({ code: 0, message: 'ok', data: timelineData })),
  http.get('/api/dashboard/country-pie', () => HttpResponse.json({ code: 0, message: 'ok', data: countryPie })),
  http.get('/api/dashboard/amr-stats', () => HttpResponse.json({ code: 0, message: 'ok', data: amrStats })),
  http.get('/api/dashboard/vf-stats', () => HttpResponse.json({ code: 0, message: 'ok', data: vfStats })),
  http.get('/api/dashboard/attribute-stats', () => HttpResponse.json({ code: 0, message: 'ok', data: attrStats })),
]
