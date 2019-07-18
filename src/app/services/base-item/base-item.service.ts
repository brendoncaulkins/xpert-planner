import { Injectable } from '@angular/core'

import { AbstractCrudMockService } from '../../abstracts/abstract-crud-service/abstract-crud.service.mock'
import { IBasePlanItem } from '../../models/xpert-plan.interface'
import { dummyBasePlanItems } from '../mock.data'

@Injectable()
export class BaseItemService extends AbstractCrudMockService<IBasePlanItem> {
  endpoint = '/base-entry'

  mockData = dummyBasePlanItems

  constructor() {
    super()
  }
}
