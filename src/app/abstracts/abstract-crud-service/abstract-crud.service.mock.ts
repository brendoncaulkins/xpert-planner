import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { first, take, tap } from 'rxjs/operators'

import { IAbstractCrudService, IBaseItem } from './abstract-crud.service'

@Injectable()
export abstract class AbstractCrudMockService<T extends IBaseItem>
  implements IAbstractCrudService<T>, Resolve<T[]> {
  readonly list: BehaviorSubject<T[]>
  abstract endpoint: string
  abstract mockData: T[]

  constructor() {
    this.list = new BehaviorSubject<T[]>([])
  }

  fetch(): Observable<T[]> {
    this.list.next(this.mockData)
    return this.list.asObservable()
  }

  getById(id: number): Observable<T> {
    const item = this.mockData.find(i => i.id === id)
    return item ? of(item) : throwError(400)
  }

  create(item: T): Observable<T> {
    const newList = [...this.list.value]
    const newItem = { ...item, id: this.mockData.length }
    newList.push(newItem)
    this.list.next(newList)
    return of(newItem)
  }

  update(item: T): Observable<T> {
    const oldItem = item && item.id ? this.list.value.find(i => i.id === item.id) : null
    if (oldItem) {
      const newList = this.list.value.filter(i => i.id !== item.id)
      newList.push(item)
      this.list.next(newList)
      return of(item)
    } else {
      return throwError(400)
    }
  }

  delete(id: number): Observable<T> {
    const item = this.list.value.find(i => i.id === id)
    if (item) {
      const newList = this.list.value.filter(i => i.id !== id)
      this.list.next(newList)
      return of(item)
    } else {
      return throwError(400)
    }
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T[]> {
    this.fetch()
    return of(this.mockData)
  }
}
