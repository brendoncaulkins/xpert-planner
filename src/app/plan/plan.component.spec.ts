import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from '../material.module'
import { SnackBarService } from '../messaging/services/snack-bar/snack-bar.service'
import { CategoryService } from '../services/category/category.service'
import { PlanService } from '../services/plan/plan.service'
import { CompletedTableComponent } from './completed-table/completed-table.component'
import { ForecastedTableComponent } from './forecasted-table/forecasted-table.component'
import { ItemFormComponent } from './item-form/item-form.component'
import { ItemListComponent } from './item-list/item-list.component'
import { PlanComponent } from './plan.component'

describe('PlanComponent', () => {
  let component: PlanComponent
  let fixture: ComponentFixture<PlanComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      declarations: [
        PlanComponent,
        ItemFormComponent,
        ItemListComponent,
        CompletedTableComponent,
        ForecastedTableComponent,
      ],
      providers: [CategoryService, PlanService, SnackBarService],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
