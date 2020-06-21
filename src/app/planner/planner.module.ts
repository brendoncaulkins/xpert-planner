import { CommonModule } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { AngularFireModule } from '@angular/fire'
import { AngularFireFunctions, AngularFireFunctionsModule } from '@angular/fire/functions'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { ChartsModule } from 'ng2-charts'

import { environment } from '../../environments/environment'
import { MaterialModule } from '../material.module'
import { ExportPlanComponent } from './export-plan/export-plan.component'
import { ImportPlanComponent } from './import-plan/import-plan.component'
import { OverviewComponent } from './overview/overview.component'
import { TooltipListPipe } from './pipes/tooltip-list/tooltip-list.pipe'
import { ItemFormComponent } from './plan/item-form/item-form.component'
import { ItemListComponent } from './plan/item-list/item-list.component'
import { ItemTableComponent } from './plan/item-table/item-table.component'
import { PlanComponent } from './plan/plan.component'
import { PlannerRoutingModule } from './planner-routing.module'
import { baseItemFactory } from './services/base-item/base-item.factory'
import { BaseItemService } from './services/base-item/base-item.service'
import { categoryFactory } from './services/category/category.factory'
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
    TooltipListPipe,
    ItemTableComponent,
  ],
  imports: [
    ChartsModule,
    CommonModule,
    MaterialModule,
    PlannerRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
  ],
  providers: [
    {
      provide: BaseItemService,
      useFactory: baseItemFactory,
      deps: [HttpClient, AngularFireFunctions, CategoryService],
    },
    {
      provide: CategoryService,
      useFactory: categoryFactory,
      deps: [HttpClient, AngularFireFunctions],
    },
    PlanService,
    TooltipListPipe,
  ],
})
export class PlannerModule {}
