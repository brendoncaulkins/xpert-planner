import { Injectable } from '@angular/core'
import { AngularFireFunctions } from '@angular/fire/functions'
import { Resolve } from '@angular/router'
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs'
import { map, take, tap } from 'rxjs/operators'

import { environment } from '../../../../environments/environment'
import { IBasePlanItem, ICategory } from '../../models/xpert-plan.interface'
import { IAbstractCrudService } from '../abstract-crud-service/abstract-crud.service'
import { CategoryService } from '../category/category.service'
import { hydrateCategories } from './base-item.service'

@Injectable()
export class BaseItemFirebaseService
  implements IAbstractCrudService<IBasePlanItem>, Resolve<IBasePlanItem[]> {
  readonly list: BehaviorSubject<IBasePlanItem[]>
  endpoint = 'getBaseItems'

  constructor(
    private functions: AngularFireFunctions,
    private categoryService: CategoryService
  ) {
    if (!environment.production) {
      this.functions.functions.useFunctionsEmulator('http://localhost:5001')
    }
    this.list = new BehaviorSubject<IBasePlanItem[]>([])
  }

  fetch(): Observable<IBasePlanItem[]> {
    const categoryRequest = this.functions.httpsCallable<void, IBasePlanItem[]>(
      this.endpoint
    )
    return categoryRequest().pipe(tap(baseItems => this.list.next(baseItems)))
  }
  getById(id: number): Observable<IBasePlanItem> {
    return this.list.pipe(map(list => list.find(i => i.id === id)))
  }
  create(item: IBasePlanItem): Observable<IBasePlanItem> {
    console.error('BaseItemFirebaseService.create NOT IMPLEMNTED')
    return of(null)
  }
  update(item: IBasePlanItem): Observable<IBasePlanItem> {
    console.error('BaseItemFirebaseService.update NOT IMPLEMNTED')
    return of(null)
  }
  delete(id: number): Observable<IBasePlanItem> {
    console.error('BaseItemFirebaseService.delete NOT IMPLEMNTED')
    return of(null)
  }

  resolve(): Observable<IBasePlanItem[]> {
    return combineLatest([this.fetch(), this.categoryService.fetch()]).pipe(
      map(([i, c]: [IBasePlanItem[], ICategory[]]) => hydrateCategories(i, c)),
      tap(items => this.list.next(items)),
      take(1)
    )
  }
}
