import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { plan } from '../../models/mock.data'
import { IPlanItem } from '../../models/xpert-plan.interface'
import { ForecastedTableComponent } from './forecasted-table.component'

describe('ForecastedTableComponent', () => {
  let component: ForecastedTableComponent
  let fixture: ComponentFixture<ForecastedTableComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatCardModule,
        NoopAnimationsModule,
      ],
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
    it('should default to the prop name as given', () => {
      expect(component.sortAccessor(item, 'points')).toBe(item.points)
    })
  })
})
