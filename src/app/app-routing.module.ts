import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ErrorComponent } from './error/error.component'

const routes: Routes = [
  {
    path: 'planner',
    loadChildren: () => import('./planner/planner.module').then(m => m.PlannerModule),
  },
  { path: '', redirectTo: 'planner', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
