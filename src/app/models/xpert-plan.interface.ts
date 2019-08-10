import { IBaseItem } from '../abstracts/abstract-crud-service/abstract-crud.service'

export interface IXpert {
  firstName: string
  lastName: string
  title: string
  about: string
  personalStatement: string
}

export interface ICategory extends IBaseItem {
  name: string
}

export interface IBasePlanItem extends IBaseItem {
  category: ICategory
  type: string
  points: number
}

export interface IPlanItem extends IBaseItem {
  baseItem: IBasePlanItem
  description: string
  points?: number
  completed?: boolean
  completedOn?: Date
}
