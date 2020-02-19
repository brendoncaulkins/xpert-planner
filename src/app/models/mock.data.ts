import { IBasePlanItem, ICategory, IPlanItem } from './xpert-plan.interface'

export const categories: ICategory[] = [
  { id: 1, name: 'Category 1' } as ICategory,
  { id: 2, name: 'Category 2' } as ICategory,
]

export const baseItems: IBasePlanItem[] = [
  {
    categoryId: 1,
    category: categories[0],
    points: 1,
    type: 'Sample Item',
  } as IBasePlanItem,
  {
    categoryId: 2,
    category: categories[1],
    points: 5,
    type: 'Other Sample Item',
  } as IBasePlanItem,
  {
    categoryId: 2,
    category: categories[1],
    points: 3,
    type: 'A third Item',
  } as IBasePlanItem,
]

export const plan: IPlanItem[] = [
  {
    baseItem: baseItems[0],
    points: 2,
    description: 'A description',
    completed: true,
    completedOn: new Date(
      new Date(new Date().setMonth(new Date().getMonth() - 2)).setHours(0, 0, 0, 0)
    ),
  } as IPlanItem,
  {
    baseItem: baseItems[1],
    points: 5,
    description: 'Another description',
    completed: true,
    completedOn: new Date(
      new Date(new Date().setMonth(new Date().getMonth() - 5)).setHours(0, 0, 0, 0)
    ),
  } as IPlanItem,
  {
    baseItem: baseItems[2],
    points: 3,
    description: 'A very long and elaborate description',
    completed: false,
    completedOn: null,
  } as IPlanItem,
]
