import { IBaseItem } from '../services/abstract-crud-service/abstract-crud.service'

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
  categoryId: number
  category?: ICategory
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
