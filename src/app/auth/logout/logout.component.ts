import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'
import { SubSink } from 'subsink'

import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-logout',
  template: `
    <p>
      Logging you out...
    </p>
  `,
})
export class LogoutComponent implements OnInit, OnDestroy {
  subs = new SubSink()

  constructor(private authService: AuthService, private router: Router) {
    this.subs.add(
      this.authService.authStatus$
        .pipe(filter(status => !status.isAuthenticated))
        .subscribe(() => {
          this.router.navigate(['/', 'login'])
        })
    )
  }

  ngOnInit(): void {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
