import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BioFormComponent } from './bio-form/bio-form.component'
import { ErrorComponent } from './error/error.component'
import { HomeComponent } from './home/home.component'
import { MaterialModule } from './material.module'
import { ItemFormComponent } from './plan/item-form/item-form.component'
import { ItemListComponent } from './plan/item-list/item-list.component'
import { PlanComponent } from './plan/plan.component'
import { ReviewComponent } from './review/review.component'
import { BaseItemService } from './services/base-item/base-item.service'
import { CategoryService } from './services/category/category.service';
import { ImportPlanComponent } from './import-plan/import-plan.component';
import { ExportPlanComponent } from './export-plan/export-plan.component'

@NgModule({
  declarations: [
    AppComponent,
    BioFormComponent,
    ErrorComponent,
    HomeComponent,
    ItemFormComponent,
    ItemListComponent,
    ReviewComponent,
    PlanComponent,
    ImportPlanComponent,
    ExportPlanComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  providers: [BaseItemService, CategoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
