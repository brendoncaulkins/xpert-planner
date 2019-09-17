import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCardModule } from '@angular/material'
import { RouterTestingModule } from '@angular/router/testing'

import { BaseItemService } from '../services/base-item/base-item.service'
import { PlanService } from '../services/plan/plan.service'
import { ImportPlanComponent } from './import-plan.component'

describe('ImportPlanComponent', () => {
  let component: ImportPlanComponent
  let fixture: ComponentFixture<ImportPlanComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FlexLayoutModule, MatCardModule, RouterTestingModule],
      declarations: [ImportPlanComponent],
      providers: [BaseItemService, PlanService],
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
