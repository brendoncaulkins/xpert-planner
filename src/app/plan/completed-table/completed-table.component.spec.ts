import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { MatCardModule, MatSortModule, MatTableModule } from '@angular/material'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { plan } from 'src/app/models/mock.data'
import { IPlanItem } from 'src/app/models/xpert-plan.interface'

import { CompletedTableComponent } from './completed-table.component'

describe('CompletedTableComponent', () => {
  let component: CompletedTableComponent
  let fixture: ComponentFixture<CompletedTableComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatCardModule,
        NoopAnimationsModule,
      ],
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

  describe('sortAccessor', () => {
    let item: IPlanItem

    beforeEach(() => {
      item = plan[0]
    })
    it('should use the category name when sorting by category', () => {
      expect(component.sortAccessor(item, 'category')).toEqual(
        item.baseItem.category.name
      )
    })
    it('should use the item type name when sorting by type', () => {
      expect(component.sortAccessor(item, 'base-item')).toEqual(item.baseItem.type)
    })
    it('should use completedOn name when sorting by completion Date', () => {
      expect(component.sortAccessor(item, 'completion-date')).toEqual(
        item.completedOn.getTime()
      )
    })
    it('should default to the prop name as given', () => {
      expect(component.sortAccessor(item, 'points')).toBe(item.points)
    })
  })
})
