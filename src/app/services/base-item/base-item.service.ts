import { Injectable } from '@angular/core'

import { IBasePlanItem } from '../../models/xpert-plan.interface'
import { AbstractCrudService } from '../abstract-crud-service/abstract-crud.service'

@Injectable()
export class BaseItemService extends AbstractCrudService<IBasePlanItem> {
  endpoint = '/base-entry'
}
