import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { BioFormComponent } from './bio-form/bio-form.component'
import { ErrorComponent } from './error/error.component'
import { ExportPlanComponent } from './export-plan/export-plan.component'
import { ImportPlanComponent } from './import-plan/import-plan.component'
import { OverviewComponent } from './overview/overview.component'
import { PlanComponent } from './plan/plan.component'
import { BaseItemService } from './services/base-item/base-item.service'
import { CategoryService } from './services/category/category.service'

const routes: Routes = [
  { path: 'bio', component: BioFormComponent },
  {
    path: 'plan',
    component: PlanComponent,
    resolve: {
      baseItems: BaseItemService,
      categories: CategoryService,
    },
  },
  { path: 'overview', component: OverviewComponent },
  { path: 'export', component: ExportPlanComponent },
  {
    path: 'import',
    component: ImportPlanComponent,
    resolve: {
      baseItems: BaseItemService,
    },
  },
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [BaseItemService],
  exports: [RouterModule],
})
export class AppRoutingModule {}
