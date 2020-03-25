import { Route } from '@angular/compiler/src/core'
import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'

import { SnackBarService } from '../messaging/services/snack-bar/snack-bar.service'
import { Role } from './auth.enum'
import { AuthService } from './services/auth.service'

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    protected authService: AuthService,
    protected router: Router,
    private toastService: SnackBarService
  ) {}

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin()
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(route)
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(childRoute)
  }

  protected checkLogin(route?: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.authStatus$.pipe(
      map(authStatus => {
        const roleMatch = this.checkRoleMatch(route, authStatus.userRole)
        const allowLogin = authStatus.isAuthenticated && roleMatch
        if (!allowLogin) {
          this.showAlert(authStatus.isAuthenticated, roleMatch)
          this.router.navigate(['login'], {
            queryParams: {
              redirectUrl: this.getResolvedUrl(route),
            },
          })
        }
        return allowLogin
      }),
      take(1) // the observable must complete for the guard to work
    )
  }

  private checkRoleMatch(route: ActivatedRouteSnapshot, role: Role) {
    if (!route || !route.data.expectedRole) {
      return true
    }
    return role === route.data.expectedRole
  }

  private showAlert(isAuth: boolean, roleMatch: boolean) {
    if (!isAuth) {
      this.toastService.openSnackBar('You must login to continue')
    }

    if (!roleMatch) {
      this.toastService.openSnackBar(
        'You do not have the permissions to view this resource'
      )
    }
  }

  getResolvedUrl(route: ActivatedRouteSnapshot): string {
    if (!route) {
      return ''
    }

    return route.pathFromRoot
      .map(r => r.url.map(segment => segment.toString()).join('/'))
      .join('/')
      .replace('//', '/')
  }
}
