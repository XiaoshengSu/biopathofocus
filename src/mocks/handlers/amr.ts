import { http, HttpResponse } from 'msw'

const amrGenes = [
  { geneId: '1', geneName: "aph(3')-Ia", category: 'Aminoglycoside', resistanceRate: 0.09, samples: Object.fromEntries(Array.from({ length: 15 }, (_, i) => [`JH${2301 + i}`, i % 11 === 0 ? 1 : 0] as const)) },
  { geneId: '2', geneName: "aph(3')-VIa", category: 'Aminoglycoside', resistanceRate: 0.55, samples: Object.fromEntries(Array.from({ length: 15 }, (_, i) => [`JH${2301 + i}`, i % 2 === 0 ? 1 : 0] as const)) },
  { geneId: '3', geneName: 'blaCTX-M-55', category: 'ESBL', resistanceRate: 0.27, samples: Object.fromEntries(Array.from({ length: 15 }, (_, i) => [`JH${2301 + i}`, i % 4 === 0 ? 1 : 0] as const)) },
  { geneId: '4', geneName: 'blaNDM-1', category: 'Carbapenemase', resistanceRate: 0.18, samples: Object.fromEntries(Array.from({ length: 15 }, (_, i) => [`JH${2301 + i}`, i % 6 === 0 ? 1 : 0] as const)) },
  { geneId: '5', geneName: 'blaNDM-5', category: 'Carbapenemase', resistanceRate: 0.09, samples: Object.fromEntries(Array.from({ length: 15 }, (_, i) => [`JH${2301 + i}`, i % 11 === 0 ? 1 : 0] as const)) },
  { geneId: '6', geneName: 'blaOXA-1', category: 'Beta-lactamase', resistanceRate: 0.36, samples: Object.fromEntries(Array.from({ length: 15 }, (_, i) => [`JH${2301 + i}`, i % 3 === 0 ? 1 : 0] as const)) },
  { geneId: '7', geneName: 'blaTEM-1B', category: 'Beta-lactamase', resistanceRate: 0.82, samples: Object.fromEntries(Array.from({ length: 15 }, (_, i) => [`JH${2301 + i}`, i % 2 === 0 || i % 3 === 0 ? 1 : 0] as const)) },
  { geneId: '8', geneName: 'dfrA1', category: 'Trimethoprim', resistanceRate: 0.55, samples: Object.fromEntries(Array.from({ length: 15 }, (_, i) => [`JH${2301 + i}`, i % 2 === 0 ? 1 : 0] as const)) },
  { geneId: '9', geneName: 'catA1', category: 'Phenicol', resistanceRate: 0.18, samples: Object.fromEntries(Array.from({ length: 15 }, (_, i) => [`JH${2301 + i}`, i % 6 === 0 ? 1 : 0] as const)) },
]

const amrStats = {
  categories: [
    { name: 'Beta-lactamase', count: 35, rate: 0.82 },
    { name: 'Aminoglycoside', count: 22, rate: 0.55 },
    { name: 'Carbapenemase', count: 18, rate: 0.27 },
    { name: 'Trimethoprim', count: 28, rate: 0.55 },
    { name: 'Phenicol', count: 12, rate: 0.18 },
  ],
  topGenes: [
    { name: 'blaTEM-1B', rate: 0.82 },
    { name: "aph(3')-VIa", rate: 0.55 },
    { name: 'dfrA1', rate: 0.55 },
    { name: 'blaOXA-1', rate: 0.36 },
    { name: 'blaCTX-M-55', rate: 0.27 },
  ],
}

const amrClasses = [
  { label: 'Aminoglycoside', value: 'Aminoglycoside' },
  { label: 'ESBL', value: 'ESBL' },
  { label: 'Carbapenemase', value: 'Carbapenemase' },
  { label: 'Beta-lactamase', value: 'Beta-lactamase' },
  { label: 'Trimethoprim', value: 'Trimethoprim' },
  { label: 'Phenicol', value: 'Phenicol' },
]

export const amrHandlers = [
  http.get('/api/amr/matrix', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 20)
    const amrClass = url.searchParams.get('amrClass') || ''
    let filtered = amrGenes
    if (amrClass) filtered = filtered.filter(g => g.category === amrClass)
    const start = (page - 1) * pageSize
    return HttpResponse.json({ code: 0, message: 'ok', data: { list: filtered.slice(start, start + pageSize), total: filtered.length, page, pageSize } })
  }),
  http.get('/api/amr/stats', () => HttpResponse.json({ code: 0, message: 'ok', data: amrStats })),
  http.get('/api/amr/classes', () => HttpResponse.json({ code: 0, message: 'ok', data: amrClasses })),
]
