import { Route } from '@angular/compiler/src/core'
import { TestBed } from '@angular/core/testing'
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { Observable, of } from 'rxjs'

import { ErrorComponent } from '../error/error.component'
import { MessagingModule } from '../messaging/messaging.module'
import { Role } from './auth.enum'
import { AuthGuard } from './auth.guard'
import { AuthService, IAuthStatus } from './services/auth.service'
import { AuthServiceFake } from './services/auth.service.fake'

describe('AuthGuard', () => {
  let authService: AuthService
  let guard: AuthGuard
  let router: Router

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
    router = TestBed.inject(Router)
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

  describe('canActivate', () => {
    let mockRoute: ActivatedRouteSnapshot
    let pathSpy: jasmine.Spy
    let routerNavigateSpy: jasmine.Spy

    beforeEach(() => {
      mockRoute = new ActivatedRouteSnapshot()
      pathSpy = spyOnProperty(mockRoute, 'pathFromRoot')
      routerNavigateSpy = spyOn(router, 'navigate')
    })

    it('should return false if user is NOT authenticated', done => {
      // Arrange
      authService.authStatus$.next({
        isAuthenticated: false,
        userRole: Role.None,
      } as IAuthStatus)
      pathSpy.and.returnValue([])

      // Act
      const canActivate = guard.canActivate(
        mockRoute,
        {} as RouterStateSnapshot
      ) as Observable<boolean>

      // Assert
      canActivate.subscribe(allowed => {
        expect(allowed).toBe(false)
        done()
      })
    })

    it('should return false if user does not have allowed Role', done => {
      // Arrange
      authService.authStatus$.next({
        isAuthenticated: true,
        userRole: Role.None,
      } as IAuthStatus)
      mockRoute.data = { expectedRole: Role.Admin }
      pathSpy.and.returnValue([])

      // Act

      const canActivate = guard.canActivate(
        mockRoute,
        {} as RouterStateSnapshot
      ) as Observable<boolean>

      // Assert
      canActivate.subscribe(allowed => {
        expect(allowed).toBe(false)
        done()
      })
    })

    it('should treat no expected role as all roles allowed', done => {
      // Arrange
      authService.authStatus$.next({
        isAuthenticated: true,
        userRole: Role.None,
      } as IAuthStatus)
      mockRoute.data = { expectedRole: null }
      pathSpy.and.returnValue([])

      // Act

      const canActivate = guard.canActivate(
        mockRoute,
        {} as RouterStateSnapshot
      ) as Observable<boolean>

      // Assert
      canActivate.subscribe(allowed => {
        expect(allowed).toBe(true)
        done()
      })
    })

    it('should redirect to the login on failure', done => {
      // Arrange
      authService.authStatus$.next({
        isAuthenticated: true,
        userRole: Role.None,
      } as IAuthStatus)
      mockRoute.data = { expectedRole: Role.Admin }
      pathSpy.and.returnValue([{ url: ['test', 'path'] }])

      // Act

      const canActivate = guard.canActivate(
        mockRoute,
        {} as RouterStateSnapshot
      ) as Observable<boolean>

      // Assert
      canActivate.subscribe(allowed => {
        expect(allowed).toBe(false)
        expect(router.navigate).toHaveBeenCalledWith(['login'], {
          queryParams: { redirectUrl: 'test/path' },
        })
        done()
      })
    })
  })

  describe('canActivateChild', () => {
    let mockRoute: ActivatedRouteSnapshot
    let pathSpy: jasmine.Spy

    beforeEach(() => {
      mockRoute = new ActivatedRouteSnapshot()
      pathSpy = spyOnProperty(mockRoute, 'pathFromRoot')
    })

    it('should just reuse canActivate', done => {
      // Arrange
      authService.authStatus$.next({
        isAuthenticated: false,
        userRole: Role.None,
      } as IAuthStatus)
      pathSpy.and.returnValue([])

      const mockState = {} as RouterStateSnapshot

      spyOn(guard, 'canActivate').and.returnValue(of(null))

      // Act
      const canActivateChild = guard.canActivateChild(mockRoute, mockState) as Observable<
        boolean
      >

      // Assert
      canActivateChild.subscribe(() => {
        expect(guard.canActivate).toHaveBeenCalledWith(mockRoute, mockState)
        done()
      })
    })
  })
})
