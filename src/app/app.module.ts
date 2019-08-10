import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ChartsModule } from 'ng2-charts'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BioFormComponent } from './bio-form/bio-form.component'
import { ErrorComponent } from './error/error.component'
import { ExportPlanComponent } from './export-plan/export-plan.component'
import { HomeComponent } from './home/home.component'
import { ImportPlanComponent } from './import-plan/import-plan.component'
import { MaterialModule } from './material.module'
import { OverviewComponent } from './overview/overview.component'
import { ItemFormComponent } from './plan/item-form/item-form.component'
import { ItemListComponent } from './plan/item-list/item-list.component'
import { PlanComponent } from './plan/plan.component'
import { BaseItemService } from './services/base-item/base-item.service'
import { CategoryService } from './services/category/category.service'
import { PlanService } from './services/plan/plan.service'

@NgModule({
  declarations: [
    AppComponent,
    BioFormComponent,
    ErrorComponent,
    HomeComponent,
    ItemFormComponent,
    ItemListComponent,
    PlanComponent,
    ImportPlanComponent,
    ExportPlanComponent,
    OverviewComponent,
  ],
  imports: [
    ChartsModule,
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  providers: [BaseItemService, CategoryService, PlanService],
  bootstrap: [AppComponent],
})
export class AppModule {}
