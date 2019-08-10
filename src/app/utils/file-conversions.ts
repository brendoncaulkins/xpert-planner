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

const csvHeader = 'Category,Type,Description,Points,Completed,Completed On'
export function exportAsCsv(items: IPlanItem[]): string {
  const rows = items.map(i =>
    [
      i.baseItem.category.name,
      i.baseItem.type,
      i.description,
      i.points,
      i.completed,
      safeDateString(i.completedOn),
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
  return fields.length >= 5
    ? {
        baseItem: findBaseItem(fields[0], fields[1], baseItems),
        description: fields[2],
        points: Number.parseInt(fields[3], 10),
        completed: fields[4].toLowerCase() === 'true',
        completedOn: fields[4].toLowerCase() === 'true' ? new Date(fields[5]) : null,
        id: null,
      }
    : null
}

export function exportAsJson(items: IPlanItem[]): string {
  return JSON.stringify(
    items.map(i => ({
      category: i.baseItem.category.name,
      type: i.baseItem.type,
      description: i.description,
      points: i.points,
      completed: i.completed,
      completedOn: safeDateString(i.completedOn),
    }))
  )
}

export function importFromJson(data: string, baseItems: IBasePlanItem[]): IPlanItem[] {
  const json: any[] = JSON.parse(data)
  return json.map(
    j =>
      ({
        baseItem: findBaseItem(j.category, j.type, baseItems),
        description: j.description,
        points: j.points,
        completed: j.completed,
        completedOn: j.completed ? new Date(j.completedOn) : '',
        id: null,
      } as IPlanItem)
  )
}

function findBaseItem(
  categoryName: string,
  baseItemType: string,
  baseItems: IBasePlanItem[]
): IBasePlanItem {
  console.log(categoryName, baseItemType)
  return baseItems.find(i => i.category.name === categoryName && i.type === baseItemType)
}

function safeDateString(date: Date): string {
  return date ? date.toLocaleDateString() : ''
}
