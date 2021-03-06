import { HttpClient } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { AngularFireFunctions } from '@angular/fire/functions'
import { RouterModule, Routes } from '@angular/router'

import { Role } from '../auth/auth.enum'
import { AuthGuard } from '../auth/auth.guard'
import { ExportPlanComponent } from './export-plan/export-plan.component'
import { UnsavedDataGuard } from './guards/unsaved-data/unsaved-data.guard'
import { ImportPlanComponent } from './import-plan/import-plan.component'
import { OverviewComponent } from './overview/overview.component'
import { PlanComponent } from './plan/plan.component'
import { BaseItemService } from './services/base-item/base-item.service'
import { categoryFactory } from './services/category/category.factory'
import { CategoryService } from './services/category/category.service'

const routes: Routes = [
  {
    path: 'plan',
    component: PlanComponent,
    canDeactivate: [UnsavedDataGuard],
    canActivate: [AuthGuard],
    data: {
      expectedRole: Role.User,
    },
    resolve: {
      baseItems: BaseItemService,
    },
  },
  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: Role.User,
    },
  },
  {
    path: 'export',
    component: ExportPlanComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: Role.User,
    },
  },
  {
    path: 'import',
    component: ImportPlanComponent,
    resolve: {
      baseItems: BaseItemService,
    },
    canActivate: [AuthGuard],
    data: {
      expectedRole: Role.User,
    },
  },
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    BaseItemService,
    UnsavedDataGuard,
    {
      provide: CategoryService,
      useFactory: categoryFactory,
      deps: [HttpClient, AngularFireFunctions],
    },
  ],
  exports: [RouterModule],
})
export class PlannerRoutingModule {}
