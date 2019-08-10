import { IBasePlanItem, IPlanItem } from '../models/xpert-plan.interface'

export enum FileType {
  CSV,
  JSON,
}

export interface ISupportedFileType {
  fileType: FileType
  description: string
  extension: string
  exportFn: (items: IPlanItem[]) => string
  importFn: (data: string, baseItems: IBasePlanItem[]) => IPlanItem[]
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

const csvHeader = 'Category,Description,Points,Completed,Completed On'
export function exportAsCsv(items: IPlanItem[]): string {
  const rows = items.map(i =>
    [
      i.baseItem.category.name,
      i.description,
      i.points,
      i.completed,
      i.completedOn ? i.completedOn.toLocaleDateString() : '',
    ].join(',')
  )
  rows.unshift(csvHeader)
  return rows.join('\n')
}

export function importFromCsv(data: string, baseItems: IBasePlanItem[]): IPlanItem[] {
  const rows = data.split('\n')
  if (rows[0] === csvHeader) {
    rows.splice(0, 1)
  }
  return rows.map(s => csvToPlanItem(s, baseItems))
}

function csvToPlanItem(row: string, baseItems: IBasePlanItem[]): IPlanItem {
  const fields = row.split(',')
  return fields.length >= 4
    ? {
        baseItem: baseItems.find(i => i.category.name === fields[0]),
        description: fields[1],
        points: Number.parseInt(fields[2], 10),
        completed: fields[3].toLowerCase() === 'true',
        completedOn: fields[3].toLowerCase() === 'true' ? new Date(fields[4]) : null,
        id: null,
      }
    : null
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

export function importFromJson(data: string, baseItems: IBasePlanItem[]): IPlanItem[] {
  return []
}
