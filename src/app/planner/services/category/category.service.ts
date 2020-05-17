import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { ICategory } from '../../models/xpert-plan.interface'
import {
  AbstractCrudService,
  IAbstractCrudService,
} from '../abstract-crud-service/abstract-crud.service'

@Injectable()
export class CategoryService extends AbstractCrudService<ICategory>
  implements IAbstractCrudService<ICategory> {
  endpoint = '/category'

  constructor(protected http: HttpClient) {
    super(http)
  }
}
