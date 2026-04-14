import { http, HttpResponse } from 'msw'

const mlstData = Array.from({ length: 40 }, (_, i) => ({
  sampleName: `ARC${1000 + i}`,
  sampleId: `ARC${1000 + i}`,
  scheme: i % 2 === 0 ? 'abaumannii_2' : 'abaumannii_3',
  st: [1, 2, 3, 101, 208][i % 5],
  genes: { Pox_oxa23: (i % 3) + 1, Pox_kpc: (i % 2) + 1, Pox_ges: (i % 4) + 1, Pox_imp: (i % 2) + 1, Pox_vim: (i % 3) + 1, Pox_ndm: (i % 2) + 1, Pox_spm: (i % 5) + 1 },
}))

const cgmlstData = Array.from({ length: 30 }, (_, i) => ({
  sampleId: `test_cgMLST_${i + 1}`,
  alleles: Object.fromEntries(Array.from({ length: 10 }, (_, j) => [`locus_${j + 1}`, (i + j) % 12 + 1])),
}))

const antigenData = Array.from({ length: 40 }, (_, i) => ({
  sampleId: `JK${String(i + 1).padStart(3, '0')}`,
  kType: ['KL55', 'KL39', 'KL28', 'KL21', 'KL108'][i % 5],
  oType: ['O2#1', 'O4', 'O1#2', 'O8'][i % 4],
  hType: ['H1', 'H2', 'H3'][i % 3],
}))

const mlstPie = [
  { name: 'ST2', value: 15 }, { name: 'ST1', value: 10 }, { name: 'ST3', value: 8 },
  { name: 'ST101', value: 5 }, { name: 'ST208', value: 2 },
]

export const typingHandlers = [
  http.get('/api/typing/mlst', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 20)
    const start = (page - 1) * pageSize
    return HttpResponse.json({ code: 0, message: 'ok', data: { list: mlstData.slice(start, start + pageSize), total: mlstData.length, page, pageSize } })
  }),
  http.get('/api/typing/mlst/pie-chart', () => HttpResponse.json({ code: 0, message: 'ok', data: mlstPie })),
  http.get('/api/typing/cgmlst', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 20)
    const start = (page - 1) * pageSize
    return HttpResponse.json({ code: 0, message: 'ok', data: { list: cgmlstData.slice(start, start + pageSize), total: cgmlstData.length, page, pageSize } })
  }),
  http.get('/api/typing/antigen', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 20)
    const start = (page - 1) * pageSize
    return HttpResponse.json({ code: 0, message: 'ok', data: { list: antigenData.slice(start, start + pageSize), total: antigenData.length, page, pageSize } })
  }),
]
