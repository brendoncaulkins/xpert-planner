import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCardModule, MatTableModule } from '@angular/material'
import { PlanService } from 'src/app/services/plan/plan.service'

import { PlanDisplayComponent } from './plan-display.component'

describe('PlanDisplayComponent', () => {
  let component: PlanDisplayComponent
  let fixture: ComponentFixture<PlanDisplayComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule, MatCardModule, FlexLayoutModule],
      declarations: [PlanDisplayComponent],
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
