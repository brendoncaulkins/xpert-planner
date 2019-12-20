import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { Observable, combineLatest } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { IBasePlanItem, ICategory } from '../../models/xpert-plan.interface'
import { AbstractCrudService } from '../abstract-crud-service/abstract-crud.service'
import { CategoryService } from '../category/category.service'

@Injectable()
export class BaseItemService extends AbstractCrudService<IBasePlanItem>
  implements Resolve<IBasePlanItem[]> {
  endpoint = '/base-item'

  constructor(protected http: HttpClient, private categoryService: CategoryService) {
    super(http)
  }

  // OVERRIDE
  resolve(): Observable<IBasePlanItem[]> {
    return combineLatest(this.fetch(), this.categoryService.fetch()).pipe(
      map(([items, categories]: [IBasePlanItem[], ICategory[]]) =>
        items.map(item => ({
          ...item,
          category: categories.find(c => c.id === item.categoryId),
        }))
      ),
      tap(items => this.list.next(items))
    )
  }
}
