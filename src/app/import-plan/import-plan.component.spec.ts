import { CommonModule } from '@angular/common'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCardModule } from '@angular/material'
import { RouterTestingModule } from '@angular/router/testing'

import { BaseItemService } from '../services/base-item/base-item.service'
import { CategoryService } from '../services/category/category.service'
import { PlanService } from '../services/plan/plan.service'
import { ImportPlanComponent } from './import-plan.component'

describe('ImportPlanComponent', () => {
  let component: ImportPlanComponent
  let fixture: ComponentFixture<ImportPlanComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FlexLayoutModule,
        HttpClientTestingModule,
        MatCardModule,
        RouterTestingModule,
      ],
      declarations: [ImportPlanComponent],
      providers: [BaseItemService, PlanService, CategoryService],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPlanComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
