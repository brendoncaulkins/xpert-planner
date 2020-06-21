import { Component, OnDestroy } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { SubSink } from 'subsink'

import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    `
      .form-container {
        width: 50%;
        min-width: 200px;
      }

      .password-requirement {
        color: red;
        font-weight: bold;
      }

      .password-requirement.pass {
        color: darkgreen;
        font-weight: normal;
      }
    `,
  ],
})
export class RegisterComponent implements OnDestroy {
  subs = new SubSink()
  formGroup: FormGroup

  pwdMinLength = 8

  pwdHasMinLength$: Observable<boolean>
  pwdHasUpper$: Observable<boolean>
  pwdHasLower$: Observable<boolean>
  pwdHasNumber$: Observable<boolean>

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formGroup = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, this.passwordMeetsRequirements(this.pwdMinLength)],
      ],
      confirmPassword: ['', [Validators.required, this.confirmValidator]],
    })

    this.pwdHasMinLength$ = this.password.valueChanges.pipe(
      map(pwd => this.hasMinCharLength(pwd, this.pwdMinLength))
    )
    this.pwdHasUpper$ = this.password.valueChanges.pipe(
      map(pwd => this.hasUppercaseLetter(pwd))
    )
    this.pwdHasLower$ = this.password.valueChanges.pipe(
      map(pwd => this.hasLowercaseLetter(pwd))
    )
    this.pwdHasNumber$ = this.password.valueChanges.pipe(map(pwd => this.hasNumber(pwd)))
  }

  passwordMeetsRequirements(length: number): ValidatorFn {
    return (control: AbstractControl) => {
      const pwd = control.value
      if (!this.hasMinCharLength(pwd, length)) {
        return { password: `Does not meet minimum length (${length}).` }
      }
      if (!this.hasUppercaseLetter(pwd)) {
        return { password: `Does not have an Uppercase letter.` }
      }
      if (!this.hasLowercaseLetter(pwd)) {
        return { password: `Does not have a Lowercase letter.` }
      }
      if (!this.hasNumber(pwd)) {
        return { password: `Does not have a number.` }
      }

      return null
    }
  }

  private hasMinCharLength(pwd: string, length: number): boolean {
    return pwd.length >= length
  }

  private hasUppercaseLetter(pwd: string): boolean {
    return pwd !== pwd.toLowerCase()
  }

  private hasLowercaseLetter(pwd: string): boolean {
    return pwd !== pwd.toUpperCase()
  }

  private hasNumber(pwd: string): boolean {
    return pwd.replace(/\D/g, '').length > 0
  }

  confirmValidator: ValidatorFn = (control: AbstractControl) => {
    return control.value === control.parent?.get('password').value
      ? null
      : { confirm: true }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  register() {
    const email = this.email.value
    const password = this.password.value

    this.subs.add(
      this.authService
        .register(email, password)
        .pipe(switchMap(() => this.authService.login(email, password)))
        .subscribe(() => this.router.navigate(['/', 'planner', 'plan']))
    )
  }

  get email(): AbstractControl {
    return this.formGroup.get('email')
  }
  get password(): AbstractControl {
    return this.formGroup.get('password')
  }
  get confirmPassword(): AbstractControl {
    return this.formGroup.get('confirmPassword')
  }
}
