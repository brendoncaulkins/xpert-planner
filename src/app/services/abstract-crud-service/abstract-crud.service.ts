import { HttpClient } from '@angular/common/http'
import { Resolve } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { environment } from '../../../environments/environment'

export interface IBaseItem {
  id: number
}

export interface IAbstractCrudService<T extends IBaseItem> {
  readonly list: BehaviorSubject<T[]>
  endpoint: string
  fetch(): Observable<T[]>
  getById(id: number): Observable<T>
  create(item: T): Observable<T>
  update(item: T): Observable<T>
  delete(id: number): Observable<T>
}

export abstract class AbstractCrudService<T extends IBaseItem>
  implements IAbstractCrudService<T>, Resolve<T[]> {
  readonly list = new BehaviorSubject<T[]>([])

  abstract endpoint: string

  constructor(protected http: HttpClient) {}

  fetch(): Observable<T[]> {
    return this.http
      .get<T[]>(`${environment.api}${this.endpoint}`)
      .pipe(tap((items: T[]) => this.list.next(items)))
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${environment.api}${this.endpoint}/${id}`)
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(`${environment.api}${this.endpoint}`, item)
  }

  update(item: T): Observable<T> {
    return this.http.put<T>(`${environment.api}${this.endpoint}`, item)
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${environment.api}${this.endpoint}/${id}`)
  }

  resolve(): Observable<T[]> {
    return this.fetch()
  }
}
