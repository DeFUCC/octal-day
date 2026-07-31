import { parse } from 'mdld-parse'
import catalog from './venus-transit-catalog.mdld.md?raw'

export const { quads } = parse(catalog)
const nasa = id => `https://eclipse.gsfc.nasa.gov/transit/catalog/VenusCatalog#${id}`

export const list = quads.map(q => {
  if (!(q.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' && q.object.value === nasa('TransitOfVenus'))) { return false }
  return q.subject.value
}).filter(Boolean).sort()

export const epochStart = quads.find(q => q.subject.value == nasa('transit-2004-06-08') && q.predicate.value == nasa('greatestTransit')).object.value
