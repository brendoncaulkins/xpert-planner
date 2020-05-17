// THESE MUST MANUALLY be kept in sync with the app!!

export interface IBaseItem {
  id: number
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
