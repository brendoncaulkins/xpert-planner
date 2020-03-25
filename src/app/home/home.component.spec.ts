import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { filter } from 'rxjs/operators'

import { AuthService, IAuthStatus } from '../auth/services/auth.service'
import { AuthServiceFake } from '../auth/services/auth.service.fake'
import { MaterialModule } from '../material.module'
import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let authService: AuthService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [NoopAnimationsModule, MaterialModule, RouterTestingModule],
      providers: [{ provide: AuthService, useClass: AuthServiceFake }],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    authService = TestBed.inject(AuthService)
    authService.authStatus$.next({} as IAuthStatus)
    fixture.detectChanges()
  })

  it('should compile', () => {
    expect(component).toBeTruthy()
  })

  describe('isAuthenticated$', () => {
    it('should be true when authService.authStatus$.isAuthenticated is true', done => {
      component.isAuthenticated$.pipe(filter(v => v !== undefined)).subscribe(isAuth => {
        expect(isAuth).toBe(true)
        done()
      })
      authService.authStatus$.next({ isAuthenticated: true } as IAuthStatus)
    })
    it('should be false when authService.authStatus$.isAuthenticated is false', done => {
      component.isAuthenticated$.pipe(filter(v => v !== undefined)).subscribe(isAuth => {
        expect(isAuth).toBe(false)
        done()
      })
      authService.authStatus$.next({ isAuthenticated: false } as IAuthStatus)
    })
  })
})
