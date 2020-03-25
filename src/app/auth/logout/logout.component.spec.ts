import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { ErrorComponent } from 'src/app/error/error.component'

import { AuthService, IAuthStatus } from '../services/auth.service'
import { AuthServiceFake } from '../services/auth.service.fake'
import { LogoutComponent } from './logout.component'

describe('LogoutComponent', () => {
  let component: LogoutComponent
  let fixture: ComponentFixture<LogoutComponent>
  let authService: AuthService
  let router: Router

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'login', component: ErrorComponent }]),
      ],
      declarations: [LogoutComponent],
      providers: [{ provide: AuthService, useClass: AuthServiceFake }],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent)
    component = fixture.componentInstance
    authService = TestBed.inject(AuthService)
    spyOn(authService, 'logout')
    router = TestBed.inject(Router)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call authService.logout()', () => {
    expect(authService.logout).toHaveBeenCalled()
  })

  it('should redirect to the login page on successful logout', () => {
    spyOn(router, 'navigate')
    authService.authStatus$.next({ isAuthenticated: false } as IAuthStatus)
    expect(router.navigate).toHaveBeenCalledWith(['/', 'login'])
  })
})
