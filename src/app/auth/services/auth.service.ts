import { Injectable } from '@angular/core'
import * as decode from 'jwt-decode'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, filter, flatMap, map, tap } from 'rxjs/operators'

import { CacheService } from '../../abstracts/services/abstract-cache.service'
import { transformError } from '../../error/transform-error'
import { SnackBarService } from '../../messaging/services/snack-bar/snack-bar.service'
import { IUser, User } from '../../user/user'
import { Role } from '../auth.enum'

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>
  readonly currentUser$: BehaviorSubject<IUser>
  login(email: string, password: string): Observable<void>
  logout(clearToken: boolean): void
  getToken(): string
  register(email: string, password: string): Observable<void>
}

export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  userId: string
}

export interface IServerAuthResponse {
  accessToken: string
}

export const defaultAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: null,
}

@Injectable()
export abstract class AuthService extends CacheService implements IAuthService {
  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus)
  readonly currentUser$ = new BehaviorSubject<User>(new User())
  protected readonly resumeCurrentUser$ = this.authStatus$.pipe(
    filter(status => status.isAuthenticated),
    flatMap(() => this.getCurrentUser()),
    map(user => this.currentUser$.next(user)),
    catchError(transformError)
  )

  constructor(protected snackbarService: SnackBarService) {
    super()

    if (this.hasExpiredToken()) {
      this.logout(true)
    } else {
      this.authStatus$.next(this.getAuthStatusFromToken())
      // To load user on browser refresh, resume pipeline must activate on the next cycle
      // Which allows for all services to constructed properly
      setTimeout(() => this.resumeCurrentUser$.subscribe(), 0)
    }
  }

  protected abstract authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse>

  protected abstract transformJwtToken(token: unknown): IAuthStatus

  protected abstract getCurrentUser(): Observable<User>

  abstract register(email: string, password: string): Observable<void>

  login(email: string, password: string): Observable<void> {
    this.clearToken()

    const loginResponse$ = this.authProvider(email, password).pipe(
      map(value => {
        this.setToken(value.accessToken)
        const token = decode(value.accessToken)
        return this.transformJwtToken(token)
      }),
      tap(status => this.authStatus$.next(status)),
      filter(status => status.isAuthenticated),
      flatMap(() => this.getCurrentUser()),
      map(user => this.currentUser$.next(user)),
      catchError(transformError)
    )

    loginResponse$.subscribe(
      this.snackbarService.observerFor(
        'Login',
        () => {}, // nothing special on login
        err => {
          this.logout()
          return throwError(err)
        }
      )
    )

    return loginResponse$
  }

  logout(clearToken = false) {
    if (clearToken) {
      this.clearToken()
    }
    setTimeout(() => this.authStatus$.next(defaultAuthStatus), 0)
  }

  protected setToken(jwt: string) {
    this.setItem('jwt', jwt)
  }

  getToken(): string {
    return this.getItem('jwt') || ''
  }

  protected clearToken() {
    this.removeItem('jwt')
  }

  protected hasExpiredToken(): boolean {
    const jwt = this.getToken()

    if (jwt) {
      const payload = decode(jwt) as any
      return Date.now() >= payload.exp * 1000
    }

    return true
  }

  protected getAuthStatusFromToken(): IAuthStatus {
    return this.transformJwtToken(decode(this.getToken()))
  }
}
