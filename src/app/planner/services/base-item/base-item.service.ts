import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { Observable, combineLatest } from 'rxjs'
import { map, take, tap } from 'rxjs/operators'

import { IBasePlanItem, ICategory } from '../../models/xpert-plan.interface'
import { AbstractCrudService } from '../abstract-crud-service/abstract-crud.service'
import { CategoryService } from '../category/category.service'

export function hydrateCategories(items: IBasePlanItem[], categories: ICategory[]) {
  return items.map(item => ({
    ...item,
    category: categories.find(c => c.id === item.categoryId),
  }))
}

@Injectable()
export class BaseItemService extends AbstractCrudService<IBasePlanItem>
  implements Resolve<IBasePlanItem[]> {
  endpoint = '/base-item'

  constructor(protected http: HttpClient, protected categoryService: CategoryService) {
    super(http)
  }

  // OVERRIDE
  resolve(): Observable<IBasePlanItem[]> {
    return combineLatest([this.fetch(), this.categoryService.fetch()]).pipe(
      map(([i, c]: [IBasePlanItem[], ICategory[]]) => hydrateCategories(i, c)),
      tap(items => this.list.next(items)),
      take(1)
    )
  }
}
