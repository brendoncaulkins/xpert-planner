import { Injectable } from '@angular/core'

import { AbstractCrudMockService } from '../../abstracts/abstract-crud-service/abstract-crud.service.mock'
import { ICategory } from '../../models/xpert-plan.interface'
import { dummyCategories } from '../mock.data'

@Injectable()
export class CategoryService extends AbstractCrudMockService<ICategory> {
  mockData = dummyCategories
  endpoint = '/category'

  constructor() {
    super()
  }
}
