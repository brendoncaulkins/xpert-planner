import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { BioFormComponent } from './bio-form/bio-form.component'
import { BioViewComponent } from './bio-view/bio-view.component'

const routes: Routes = [
  { path: 'edit/:id', component: BioFormComponent },
  { path: 'create', component: BioFormComponent },
  { path: 'view', component: BioViewComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BioRoutingModule {}
