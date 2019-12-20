import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ErrorComponent } from './error/error.component'
import { ExportPlanComponent } from './export-plan/export-plan.component'
import { UnsavedDataGuard } from './guards/unsaved-data/unsaved-data.guard'
import { ImportPlanComponent } from './import-plan/import-plan.component'
import { OverviewComponent } from './overview/overview.component'
import { PlanComponent } from './plan/plan.component'
import { BaseItemService } from './services/base-item/base-item.service'
import { CategoryService } from './services/category/category.service'

const routes: Routes = [
  {
    path: 'plan',
    component: PlanComponent,
    canDeactivate: [UnsavedDataGuard],
    resolve: {
      baseItems: BaseItemService,
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
  providers: [BaseItemService, UnsavedDataGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
