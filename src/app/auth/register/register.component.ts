import { Component, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
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
    `,
  ],
})
export class RegisterComponent implements OnInit, OnDestroy {
  subs = new SubSink()
  formGroup: FormGroup

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formGroup = fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  register() {
    console.warn('RegisterComponent.register: Not Yet Implemented')
  }

  get email(): AbstractControl {
    return this.formGroup.get('email')
  }
}
