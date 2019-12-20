import { Injectable } from '@angular/core'

import { ICategory } from '../../models/xpert-plan.interface'
import { AbstractCrudMockService } from '../abstract-crud-service/abstract-crud.service.mock'
import { dummyCategories } from '../mock.data'

@Injectable()
export class CategoryService extends AbstractCrudMockService<ICategory> {
  mockData = dummyCategories
  endpoint = '/category'

  constructor() {
    super()
  }
}
