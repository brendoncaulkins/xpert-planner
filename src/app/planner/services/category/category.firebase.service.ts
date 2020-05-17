import { Injectable } from '@angular/core'
import { AngularFireFunctions } from '@angular/fire/functions'
import { Resolve } from '@angular/router'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { environment } from '../../../../environments/environment'
import { ICategory } from '../../models/xpert-plan.interface'
import { IAbstractCrudService } from '../abstract-crud-service/abstract-crud.service'

@Injectable()
export class CategoryFirebaseService
  implements IAbstractCrudService<ICategory>, Resolve<ICategory[]> {
  readonly list: BehaviorSubject<ICategory[]>
  endpoint = 'getCategories'

  constructor(private functions: AngularFireFunctions) {
    if (!environment.production) {
      this.functions.functions.useFunctionsEmulator('http://localhost:5001')
    }
    this.list = new BehaviorSubject<ICategory[]>([])
  }

  fetch(): Observable<ICategory[]> {
    const categoryRequest = this.functions.httpsCallable<void, ICategory[]>(this.endpoint)
    return categoryRequest().pipe(tap(categories => this.list.next(categories)))
  }
  getById(id: number): Observable<ICategory> {
    return this.list.pipe(map(list => list.find(cat => cat.id === id)))
  }
  create(item: ICategory): Observable<ICategory> {
    console.error('CategoryFirebaseService.create NOT IMPLEMNTED')
    return of(null)
  }
  update(item: ICategory): Observable<ICategory> {
    console.error('CategoryFirebaseService.update NOT IMPLEMNTED')
    return of(null)
  }
  delete(id: number): Observable<ICategory> {
    console.error('CategoryFirebaseService.delete NOT IMPLEMNTED')
    return of(null)
  }

  resolve(): Observable<ICategory[]> {
    return this.fetch()
  }
}
