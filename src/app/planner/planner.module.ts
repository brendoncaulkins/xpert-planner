import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { ChartsModule } from 'ng2-charts'

import { MaterialModule } from '../material.module'
import { ExportPlanComponent } from './export-plan/export-plan.component'
import { ImportPlanComponent } from './import-plan/import-plan.component'
import { OverviewComponent } from './overview/overview.component'
import { CompletedTableComponent } from './plan/completed-table/completed-table.component'
import { ForecastedTableComponent } from './plan/forecasted-table/forecasted-table.component'
import { ItemFormComponent } from './plan/item-form/item-form.component'
import { ItemListComponent } from './plan/item-list/item-list.component'
import { PlanComponent } from './plan/plan.component'
import { PlannerRoutingModule } from './planner-routing.module'
import { BaseItemService } from './services/base-item/base-item.service'
import { CategoryService } from './services/category/category.service'
import { PlanService } from './services/plan/plan.service'

@NgModule({
  declarations: [
    ItemFormComponent,
    ItemListComponent,
    PlanComponent,
    ImportPlanComponent,
    ExportPlanComponent,
    OverviewComponent,
    CompletedTableComponent,
    ForecastedTableComponent,
  ],
  imports: [
    ChartsModule,
    CommonModule,
    MaterialModule,
    PlannerRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
  ],
  providers: [BaseItemService, CategoryService, PlanService],
})
export class PlannerModule {}