import { http, HttpResponse } from 'msw'

function generateSamples(count: number) {
  const species = ['Acinetobacter baumannii', 'Klebsiella pneumoniae', 'Escherichia coli']
  const hosts = ['Human', 'Animal', 'Environment']
  const countries = ['China', 'USA', 'India', 'UK', 'Japan']
  const types = ['Clinical', 'Environmental', 'Food']
  return Array.from({ length: count }, (_, i) => ({
    id: `SAMN10492${String(700 + i).padStart(3, '0')}`,
    name: `ARC${String(1000 + i)}`,
    type: types[i % 3],
    species: species[i % 3],
    serotype: ['O2#1', 'O4', 'O1#2', 'O8'][i % 4],
    st: [1, 2, 3, 101, 208][i % 5],
    alleles: { arcC: i % 3 + 1, aroE: i % 4 + 1, glpF: i % 2 + 1, gmk: i % 5 + 1, pta: i % 3 + 2, tpi: i % 4 + 1, yqiL: i % 2 + 1 },
    amrGenes: ['blaOXA-23', 'blaNDM-1', 'blaTEM-1B'].slice(0, (i % 3) + 1),
    vfGenes: ['kpsM', 'ibeA', 'fimH'].slice(0, (i % 2) + 1),
    host: hosts[i % 3],
    country: countries[i % 5],
    isolationDate: `20${19 + (i % 6)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    institution: ['Hospital A', 'Hospital B', 'CDC Lab'][i % 3],
    submitter: ['CDC', 'NICP', 'WHO'][i % 3],
  }))
}

const allSamples = generateSamples(80)

export const sampleHandlers = [
  http.get('/api/samples', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 20)
    const start = (page - 1) * pageSize
    return HttpResponse.json({
      code: 0, message: 'ok',
      data: { list: allSamples.slice(start, start + pageSize), total: allSamples.length, page, pageSize },
    })
  }),
  http.get('/api/samples/:id', ({ params }) => {
    const sample = allSamples.find(s => s.id === params.id)
    if (!sample) return HttpResponse.json({ code: 404, message: 'Not found', data: null }, { status: 404 })
    return HttpResponse.json({ code: 0, message: 'ok', data: sample })
  }),
]
