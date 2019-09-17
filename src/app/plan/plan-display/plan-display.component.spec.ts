import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCardModule, MatSortModule, MatTableModule } from '@angular/material'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { PlanService } from '../../services/plan/plan.service'
import { CompletedTableComponent } from './completed-table/completed-table.component'
import { ForecastedTableComponent } from './forecasted-table/forecasted-table.component'
import { PlanDisplayComponent } from './plan-display.component'

describe('PlanDisplayComponent', () => {
  let component: PlanDisplayComponent
  let fixture: ComponentFixture<PlanDisplayComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FlexLayoutModule,
        MatTableModule,
        MatCardModule,
        MatSortModule,
        NoopAnimationsModule,
      ],
      declarations: [
        PlanDisplayComponent,
        CompletedTableComponent,
        ForecastedTableComponent,
      ],
      providers: [PlanService],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanDisplayComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
