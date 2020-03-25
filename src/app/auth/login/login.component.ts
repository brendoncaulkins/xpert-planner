import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { tap } from 'rxjs/operators'
import { SubSink } from 'subsink'

import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  subs = new SubSink()

  constructor(private authService: AuthService, private router: Router) {
    this.subs.add(
      this.authService.authStatus$.pipe(tap(console.log)).subscribe(status => {
        if (status.isAuthenticated) {
          this.router.navigate(['/', 'planner'])
        }
      })
    )
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  login() {
    this.authService.login('brendon.caulkins@gmail.com', 'a test password!')
  }
}
