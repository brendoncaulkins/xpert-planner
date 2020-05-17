import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'

import { IUser, User } from '../../user/user'
import { IAuthService, IAuthStatus, defaultAuthStatus } from './auth.service'

@Injectable()
export class AuthServiceFake implements IAuthService {
  currentUser$ = new BehaviorSubject<IUser>(new User())
  authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus)
  constructor() {}

  login(email: string, password: string): Observable<void> {
    return of()
  }

  logout() {}

  getToken(): string {
    return ''
  }
}
