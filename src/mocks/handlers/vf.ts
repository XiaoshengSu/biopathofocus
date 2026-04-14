import { http, HttpResponse } from 'msw'

const vfGenes = [
  { geneId: '1', geneName: 'kpsM', category: 'Acinetobactin', coverage: 1.0, samples: Object.fromEntries(Array.from({ length: 16 }, (_, i) => [`JX${70 + i}`, 1] as const)) },
  { geneId: '2', geneName: 'kpsE', category: 'Acinetobactin', coverage: 1.0, samples: Object.fromEntries(Array.from({ length: 16 }, (_, i) => [`JX${70 + i}`, i % 10 === 0 ? 0 : 1] as const)) },
  { geneId: '3', geneName: 'kpsT', category: 'Acinetobactin', coverage: 1.0, samples: Object.fromEntries(Array.from({ length: 16 }, (_, i) => [`JX${70 + i}`, 1] as const)) },
  { geneId: '4', geneName: 'kpsD', category: 'Colibactin', coverage: 0.46, samples: Object.fromEntries(Array.from({ length: 16 }, (_, i) => [`JX${70 + i}`, i % 2 === 0 ? 1 : 0] as const)) },
  { geneId: '5', geneName: 'ibeA', category: 'Acinetobactin', coverage: 1.0, samples: Object.fromEntries(Array.from({ length: 16 }, (_, i) => [`JX${70 + i}`, 1] as const)) },
  { geneId: '6', geneName: 'ibeB', category: 'Acinetobactin', coverage: 1.0, samples: Object.fromEntries(Array.from({ length: 16 }, (_, i) => [`JX${70 + i}`, 1] as const)) },
  { geneId: '7', geneName: 'ibeC', category: 'Adhesion', coverage: 0.85, samples: Object.fromEntries(Array.from({ length: 16 }, (_, i) => [`JX${70 + i}`, i % 7 === 0 ? 0 : 1] as const)) },
  { geneId: '8', geneName: 'ibeD', category: 'Adhesion', coverage: 0.92, samples: Object.fromEntries(Array.from({ length: 16 }, (_, i) => [`JX${70 + i}`, i % 12 === 0 ? 0 : 1] as const)) },
  { geneId: '9', geneName: 'fimH', category: 'Adhesion', coverage: 0.75, samples: Object.fromEntries(Array.from({ length: 16 }, (_, i) => [`JX${70 + i}`, i % 4 === 0 ? 0 : 1] as const)) },
  { geneId: '10', geneName: 'cnf1', category: 'Toxin', coverage: 0.30, samples: Object.fromEntries(Array.from({ length: 16 }, (_, i) => [`JX${70 + i}`, i % 4 === 0 ? 1 : 0] as const)) },
]

const vfStats = {
  categories: [
    { name: 'Acinetobactin', count: 30, coverage: 1.0 },
    { name: 'Adhesion', count: 25, coverage: 0.84 },
    { name: 'Colibactin', count: 10, coverage: 0.46 },
    { name: 'Toxin', count: 8, coverage: 0.30 },
  ],
  topGenes: [
    { name: 'kpsM', coverage: 1.0 },
    { name: 'kpsT', coverage: 1.0 },
    { name: 'ibeA', coverage: 1.0 },
    { name: 'ibeB', coverage: 1.0 },
    { name: 'ibeD', coverage: 0.92 },
  ],
}

const vfCategories = [
  { label: 'Acinetobactin', value: 'Acinetobactin' },
  { label: 'Adhesion', value: 'Adhesion' },
  { label: 'Colibactin', value: 'Colibactin' },
  { label: 'Toxin', value: 'Toxin' },
]

export const vfHandlers = [
  http.get('/api/vf/matrix', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 20)
    const vfCategory = url.searchParams.get('vfCategory') || ''
    let filtered = vfGenes
    if (vfCategory) filtered = filtered.filter(g => g.category === vfCategory)
    const start = (page - 1) * pageSize
    return HttpResponse.json({ code: 0, message: 'ok', data: { list: filtered.slice(start, start + pageSize), total: filtered.length, page, pageSize } })
  }),
  http.get('/api/vf/stats', () => HttpResponse.json({ code: 0, message: 'ok', data: vfStats })),
  http.get('/api/vf/categories', () => HttpResponse.json({ code: 0, message: 'ok', data: vfCategories })),
]
