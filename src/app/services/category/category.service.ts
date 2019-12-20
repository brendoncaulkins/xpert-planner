import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { ICategory } from '../../models/xpert-plan.interface'
import { AbstractCrudService } from '../abstract-crud-service/abstract-crud.service'

@Injectable()
export class CategoryService extends AbstractCrudService<ICategory> {
  endpoint = '/category'

  constructor(protected http: HttpClient) {
    super(http)
  }
}
