import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { MatCardModule, MatFormFieldModule, MatSelectModule } from '@angular/material'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { PlanService } from '../services/plan/plan.service'
import { ExportPlanComponent } from './export-plan.component'

describe('ExportPlanComponent', () => {
  let component: ExportPlanComponent
  let fixture: ComponentFixture<ExportPlanComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FlexLayoutModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      declarations: [ExportPlanComponent],
      providers: [PlanService],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportPlanComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
