import { baseItems, plan } from '../models/mock.data'
import {
  csvColumns,
  exportAsCsv,
  exportAsJson,
  importFromCsv,
  importFromJson,
} from './file-conversions'

describe('file-conversions', () => {
  describe('exportAsCsv()', () => {
    let results: string

    beforeEach(() => {
      results = exportAsCsv(plan)
    })

    it('should have labels as the first row', () => {
      const rows = results.split('\n')
      expect(rows[0].split(',')).toEqual(csvColumns)
    })
    it('should have a row for each plan item', () => {
      const rows = results.split('\n')
      expect(rows.length).toEqual(plan.length + 1) // +1 for headers
    })
    it('should be importable', () => {
      const importedPlan = plan.map(i => ({ ...i, id: null }))
      expect(importFromCsv(results, baseItems)).toEqual(importedPlan)
    })
  })
  describe('importFromCsv()', () => {
    it('should purge empty lines', () => {
      const importedPlan = plan.map(i => ({ ...i, id: null }))
      expect(importFromCsv(exportAsCsv(plan).replace('\r', '\n'), baseItems)).toEqual(
        importedPlan
      )
    })
    it('should work even if column headers are gone', () => {
      const headerless = exportAsCsv(plan)
        .split('\n')
        .slice(1)
        .join('\n')
      const importedPlan = plan.map(i => ({ ...i, id: null }))
      expect(importFromCsv(headerless, baseItems)).toEqual(importedPlan)
    })
  })
  describe('exportAsJson()', () => {
    let results: string

    beforeEach(() => {
      results = exportAsJson(plan)
    })

    it('should be parsable', () => {
      expect(JSON.parse(results)).toBeDefined()
    })
    it('should be importable', () => {
      const importedPlan = plan.map(i => ({ ...i, id: null }))
      expect(importFromJson(results, baseItems)).toEqual(importedPlan)
    })
  })
})
