import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { BioFormComponent } from './bio-form/bio-form.component'
import { ErrorComponent } from './error/error.component'
import { ItemListComponent } from './plan/item-list/item-list.component'
import { ReviewComponent } from './review/review.component'
import { BaseItemService } from './services/base-item/base-item.service'

const routes: Routes = [
  { path: 'bio', component: BioFormComponent },
  {
    path: 'plan',
    component: ItemListComponent,
    resolve: {
      baseItems: BaseItemService,
    },
  },
  { path: 'review', component: ReviewComponent },
  { path: '**', component: ErrorComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [BaseItemService],
  exports: [RouterModule],
})
export class AppRoutingModule {}
