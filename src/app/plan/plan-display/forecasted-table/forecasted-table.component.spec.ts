import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { MatCardModule, MatSortModule, MatTableModule } from '@angular/material'

import { ForecastedTableComponent } from './forecasted-table.component'

describe('ForecastedTableComponent', () => {
  let component: ForecastedTableComponent
  let fixture: ComponentFixture<ForecastedTableComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, MatTableModule, MatSortModule, MatCardModule],
      declarations: [ForecastedTableComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastedTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
