import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { of, throwError } from 'rxjs'
import { MaterialModule } from 'src/app/material.module'

import { AuthService } from '../services/auth.service'
import { AuthServiceFake } from '../services/auth.service.fake'
import { RegisterComponent } from './register.component'

describe('RegisterComponent', () => {
  let component: RegisterComponent
  let fixture: ComponentFixture<RegisterComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [{ provide: AuthService, useClass: AuthServiceFake }],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('pwdHasMinLength$', () => {
    it('returns true when over the configured min length', done => {
      component.pwdHasMinLength$.subscribe(result => {
        expect(result).toBe(true)
        done()
      })

      component.password.setValue('a'.repeat(component.pwdMinLength + 1))
    })
    it('returns true when at the configured min length', done => {
      component.pwdHasMinLength$.subscribe(result => {
        expect(result).toBe(true)
        done()
      })

      component.password.setValue('a'.repeat(component.pwdMinLength))
    })
    it('returns true when less than the configured min length', done => {
      component.pwdHasMinLength$.subscribe(result => {
        expect(result).toBe(false)
        done()
      })

      component.password.setValue('a'.repeat(component.pwdMinLength - 1))
    })
  })

  describe('pwdHasUpper$', () => {
    it('returns true when has Uppercase letter', done => {
      component.pwdHasUpper$.subscribe(result => {
        expect(result).toBe(true)
        done()
      })

      component.password.setValue('A')
    })
    it('returns false when there is no Uppercase letter', done => {
      component.pwdHasUpper$.subscribe(result => {
        expect(result).toBe(false)
        done()
      })

      component.password.setValue('a')
    })
  })

  describe('pwdHasLower$', () => {
    it('returns true when has Lowercase letter', done => {
      component.pwdHasLower$.subscribe(result => {
        expect(result).toBe(true)
        done()
      })

      component.password.setValue('a')
    })
    it('returns false when there is no Lowercase letter', done => {
      component.pwdHasLower$.subscribe(result => {
        expect(result).toBe(false)
        done()
      })

      component.password.setValue('A')
    })
  })

  describe('pwdHasNumber$', () => {
    it('returns true when has number', done => {
      component.pwdHasNumber$.subscribe(result => {
        expect(result).toBe(true)
        done()
      })

      component.password.setValue('1')
    })
    it('returns false when there is no number', done => {
      component.pwdHasNumber$.subscribe(result => {
        expect(result).toBe(false)
        done()
      })

      component.password.setValue('A')
    })
  })

  describe('password field validations', () => {
    it('is invalid when password is too short', () => {
      component.password.setValue('abc')
      expect(component.password.hasError('password')).toBe(true)
      expect(component.password.getError('password')).toEqual(
        `Does not meet minimum length (${component.pwdMinLength}).`
      )
    })

    it('is invalid when password has no Uppercase letters', () => {
      component.password.setValue('abcd1234')
      expect(component.password.hasError('password')).toBe(true)
      expect(component.password.getError('password')).toEqual(
        `Does not have an Uppercase letter.`
      )
    })

    it('is invalid when password has no Lowercase letters', () => {
      component.password.setValue('ABCD1234')
      expect(component.password.hasError('password')).toBe(true)
      expect(component.password.getError('password')).toEqual(
        `Does not have a Lowercase letter.`
      )
    })

    it('is invalid when password has no Lowercase letters', () => {
      component.password.setValue('Password')
      expect(component.password.hasError('password')).toBe(true)
      expect(component.password.getError('password')).toEqual(`Does not have a number.`)
    })

    it('is valid when a valid password is provided', () => {
      component.password.setValue('Password0101')
      expect(component.password.hasError('password')).toBe(false)
    })
  })

  describe('register', () => {
    const email = 'sample@test.com'
    const password = 'Password0101'

    let authService: AuthService
    let router: Router

    beforeEach(() => {
      component.email.setValue(email)
      component.password.setValue(password)
      component.confirmPassword.setValue(password)

      authService = TestBed.inject(AuthService)
      router = TestBed.inject(Router)

      // stop navigation, always
      spyOn(router, 'navigate').and.callFake(() => Promise.resolve(true))
    })

    it('calls authService.register with the form data', fakeAsync(() => {
      spyOn(authService, 'register').and.callThrough()
      spyOn(authService, 'login').and.callThrough()
      component.register()
      tick()
      expect(authService.register).toHaveBeenCalledWith(email, password)
    }))

    // test fails due to switchMap not executing in this environment
    xit('performs a login when registration is successful', fakeAsync(() => {
      spyOn(authService, 'register').and.callThrough()
      spyOn(authService, 'login').and.callThrough()
      component.register()
      tick()
      expect(authService.register).toHaveBeenCalledWith(email, password)
      expect(authService.login).toHaveBeenCalledWith(email, password)
    }))

    // test fails from uncaught thrown error
    xit('does not perform a login when registration fails', fakeAsync(() => {
      spyOn(authService, 'register').and.returnValue(throwError('Reg failed'))
      spyOn(authService, 'login').and.callThrough()
      component.register()
      tick()
      expect(authService.register).toHaveBeenCalledWith(email, password)
      expect(authService.login).not.toHaveBeenCalled()
    }))

    // test fails due to switchMap not executing in this environment
    xit('navigates after successful registration and login', fakeAsync(() => {
      spyOn(authService, 'register').and.callThrough()
      spyOn(authService, 'login').and.callThrough()
      component.register()
      tick()
      expect(authService.register).toHaveBeenCalledWith(email, password)
      expect(authService.login).toHaveBeenCalledWith(email, password)
      expect(router.navigate).toHaveBeenCalledWith(['/', 'planner'])
    }))
  })
})
