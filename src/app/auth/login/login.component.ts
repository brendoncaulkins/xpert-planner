import { Component, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { SubSink } from 'subsink'

import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      .login-container {
        width: 50%;
        min-width: 200px;
      }
    `,
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  subs = new SubSink()
  formGroup: FormGroup

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.subs.add(
      this.authService.authStatus$.subscribe(status => {
        if (status.isAuthenticated) {
          this.router.navigate(['/', 'planner'])
        }
      })
    )

    this.formGroup = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  login() {
    this.authService.login(this.email.value, this.password.value)
  }

  get email(): AbstractControl {
    return this.formGroup.get('email')
  }
  get password(): AbstractControl {
    return this.formGroup.get('password')
  }
}
