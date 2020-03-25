import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from './auth/auth.guard'
import { LoginComponent } from './auth/login/login.component'
import { LogoutComponent } from './auth/logout/logout.component'
import { ErrorComponent } from './error/error.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/:redirectUrl', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'planner',
    loadChildren: () => import('./planner/planner.module').then(m => m.PlannerModule),
    canLoad: [AuthGuard],
  },
  { path: '', redirectTo: 'planner', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
