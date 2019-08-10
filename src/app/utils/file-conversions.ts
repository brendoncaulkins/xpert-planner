import { IPlanItem } from '../models/xpert-plan.interface'

export enum FileType {
  CSV,
  JSON,
}

export interface ISupportedFileType {
  fileType: FileType
  description: string
  extension: string
  exportFn: (items: IPlanItem[]) => string
  importFn: (data: any) => IPlanItem[]
}

export const supportedFileTypes: ISupportedFileType[] = [
  {
    fileType: FileType.CSV,
    description: 'Comma Separated Value',
    extension: 'csv',
    exportFn: exportAsCsv,
    importFn: importFromCsv,
  },
  {
    fileType: FileType.JSON,
    description: 'JavaScript Object Notation',
    extension: 'json',
    exportFn: exportAsJson,
    importFn: importFromJson,
  },
]

export function exportAsCsv(items: IPlanItem[]): string {
  const header = 'Category,Description,Points,Completed,Completed On'
  const rows = items.map(i =>
    [
      i.baseItem.category.name,
      i.description,
      i.points,
      i.completed,
      i.completedOn ? i.completedOn.toLocaleDateString() : '',
    ].join(',')
  )
  rows.unshift(header)
  return rows.join('\n')
}

export function importFromCsv(data: any): IPlanItem[] {
  return []
}

export function exportAsJson(items: IPlanItem[]): string {
  return JSON.stringify(
    items.map(i => ({
      category: i.baseItem.category.name,
      description: i.description,
      points: i.points,
      completed: i.completed,
      completedOn: i.completedOn ? i.completedOn.toLocaleDateString() : '',
    }))
  )
}

export function importFromJson(data: any): IPlanItem[] {
  return []
}
