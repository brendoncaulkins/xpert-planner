import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { MatCardModule, MatSortModule, MatTableModule } from '@angular/material'

import { CompletedTableComponent } from './completed-table.component'

describe('CompletedTableComponent', () => {
  let component: CompletedTableComponent
  let fixture: ComponentFixture<CompletedTableComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule, MatSortModule, MatCardModule, CommonModule],
      declarations: [CompletedTableComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
