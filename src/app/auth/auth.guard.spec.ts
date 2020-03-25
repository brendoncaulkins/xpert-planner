import { Route } from '@angular/compiler/src/core'
import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Observable } from 'rxjs'

import { ErrorComponent } from '../error/error.component'
import { MessagingModule } from '../messaging/messaging.module'
import { Role } from './auth.enum'
import { AuthGuard } from './auth.guard'
import { AuthService, IAuthStatus } from './services/auth.service'
import { AuthServiceFake } from './services/auth.service.fake'

describe('AuthGuard', () => {
  let authService: AuthService
  let guard: AuthGuard

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'login', component: ErrorComponent }]),
        MessagingModule,
      ],
      providers: [AuthGuard, { provide: AuthService, useClass: AuthServiceFake }],
    })
    authService = TestBed.inject(AuthService)
    guard = TestBed.inject(AuthGuard)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })

  describe('canLoad', () => {
    it('should return true if user is authenticated', done => {
      authService.authStatus$.next({
        isAuthenticated: true,
        userRole: Role.User,
      } as IAuthStatus)
      const canLoad = guard.canLoad({} as Route) as Observable<boolean>
      canLoad.subscribe(allowed => {
        expect(allowed).toBe(true)
        done()
      })
    })
    it('should return false if user is NOT authenticated', done => {
      authService.authStatus$.next({
        isAuthenticated: false,
        userRole: Role.None,
      } as IAuthStatus)
      const canLoad = guard.canLoad({} as Route) as Observable<boolean>
      canLoad.subscribe(allowed => {
        expect(allowed).toBe(false)
        done()
      })
    })
  })
})
