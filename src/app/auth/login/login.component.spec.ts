import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'

import { ErrorComponent } from '../../error/error.component'
import { MaterialModule } from '../../material.module'
import { AuthService, IAuthStatus } from '../services/auth.service'
import { AuthServiceFake } from '../services/auth.service.fake'
import { LoginComponent } from './login.component'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  let authService: AuthService
  let router: Router

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule.withRoutes([{ path: 'planner', component: ErrorComponent }]),
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      declarations: [LoginComponent],
      providers: [{ provide: AuthService, useClass: AuthServiceFake }],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    authService = TestBed.inject(AuthService)
    router = TestBed.inject(Router)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should navigate when authService.authStatus$.isAuthenticated goes true', () => {
    spyOn(router, 'navigate')
    authService.authStatus$.next({ isAuthenticated: true } as IAuthStatus)
    expect(router.navigate).toHaveBeenCalledWith(['/', 'planner'])
  })

  describe('login()', () => {
    it('should call authService.login', () => {
      spyOn(authService, 'login')
      component.login()
      expect(authService.login).toHaveBeenCalled()
    })

    it('should call login() with the appropriate inputs', () => {
      spyOn(authService, 'login')
      component.formGroup.setValue({ email: 'test@test.com', password: 'P@ssword!!' })
      component.login()
      expect(authService.login).toHaveBeenCalled()
      expect(authService.login).toHaveBeenCalledWith('test@test.com', 'P@ssword!!')
    })
  })
})
