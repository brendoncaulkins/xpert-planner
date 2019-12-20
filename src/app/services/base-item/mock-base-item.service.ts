import { Injectable } from '@angular/core'

import { IBasePlanItem } from '../../models/xpert-plan.interface'
import { AbstractCrudMockService } from '../abstract-crud-service/abstract-crud.service.mock'
import { dummyBasePlanItems } from '../mock.data'

@Injectable()
export class MockBaseItemService extends AbstractCrudMockService<IBasePlanItem> {
  endpoint = '/base-entry'

  mockData = dummyBasePlanItems

  constructor() {
    super()
  }
}
