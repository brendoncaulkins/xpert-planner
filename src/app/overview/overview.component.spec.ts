import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { MatCardModule, MatIconModule } from '@angular/material'
import { ChartsModule } from 'ng2-charts'

import { CategoryService } from '../services/category/category.service'
import { PlanService } from '../services/plan/plan.service'
import { OverviewComponent } from './overview.component'

describe('OverviewComponent', () => {
  let component: OverviewComponent
  let fixture: ComponentFixture<OverviewComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, MatCardModule, MatIconModule, ChartsModule],
      declarations: [OverviewComponent],
      providers: [PlanService, CategoryService],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
