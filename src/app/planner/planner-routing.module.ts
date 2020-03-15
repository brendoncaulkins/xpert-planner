import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from '../home/home.component'
import { ExportPlanComponent } from './export-plan/export-plan.component'
import { UnsavedDataGuard } from './guards/unsaved-data/unsaved-data.guard'
import { ImportPlanComponent } from './import-plan/import-plan.component'
import { OverviewComponent } from './overview/overview.component'
import { PlanComponent } from './plan/plan.component'
import { BaseItemService } from './services/base-item/base-item.service'

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
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [BaseItemService, UnsavedDataGuard],
  exports: [RouterModule],
})
export class PlannerRoutingModule {}
