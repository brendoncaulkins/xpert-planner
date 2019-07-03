import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ErrorComponent } from './error/error.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  { path: 'bio', loadChildren: () => import('./bio/bio.module').then(m => m.BioModule) },
  { path: '**', component: ErrorComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
