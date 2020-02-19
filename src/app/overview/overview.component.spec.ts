import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { MatCardModule, MatIconModule } from '@angular/material'
import { ChartsModule } from 'ng2-charts'
import { of } from 'rxjs'

import { baseItems, categories, plan } from '../models/mock.data'
import { IPlanItem } from '../models/xpert-plan.interface'
import { CategoryService } from '../services/category/category.service'
import { PlanService } from '../services/plan/plan.service'
import { IChartDetails, OverviewComponent } from './overview.component'

xdescribe('OverviewComponent', () => {
  let component: OverviewComponent
  let fixture: ComponentFixture<OverviewComponent>
  const planService = jasmine.createSpyObj('PlanService', ['plan$'])
  planService.plan$ = of(plan)
  const categoryService = jasmine.createSpyObj('CategoryService', ['list'])
  categoryService.list = of(categories)

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartsModule, CommonModule, MatCardModule, MatIconModule],
      declarations: [OverviewComponent],
      providers: [
        { provide: PlanService, useValue: planService },
        { provide: CategoryService, useValue: categoryService },
      ],
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

  describe('generateContributionsByCategory', () => {
    let results: IChartDetails

    beforeEach(() => {
      results = component.generateContributionsByCategory(categories, plan)
    })

    it('should properly build labels from categories', () => {
      expect(results.labels).toEqual(categories.map(c => c.name))
    })
    it('should sum data points based on category, regardless of completion status', () => {
      expect(results.data).toEqual([2, 8]) // based on dummy data
    })
    it('should include all categories, even if they do not have a plan item', () => {
      const newCategories = [...categories, { id: 3, name: 'New Category' }]
      results = component.generateContributionsByCategory(newCategories, plan)
      expect(results.labels).toEqual(newCategories.map(c => c.name))
      expect(results.data).toEqual([2, 8, 0])
    })
    it('should be a pie chart', () => {
      expect(results.type).toEqual('pie')
    })
    it('should display a legend', () => {
      expect(results.legend).toBe(true)
    })
    it('should be responsive', () => {
      expect(results.options).toEqual({ responsive: true })
    })
  })

  describe('generateStatus', () => {
    let results: IChartDetails

    beforeEach(() => {
      results = component.generateStatus(plan)
    })

    it('should use static labels', () => {
      expect(results.labels).toEqual(['Completed', 'Forecasted', 'Stale'])
    })
    it('should sum the points based on completed and completedOn', () => {
      // Arrange
      const today = new Date()
      const staleDate = new Date(new Date().setFullYear(today.getFullYear() - 2))
      const staleItem = {
        baseItem: baseItems[0],
        points: 2,
        description: 'A stale description',
        completed: true,
        completedOn: staleDate,
      } as IPlanItem
      expect(component.isStale(staleItem)).toBe(true)
      const newPlan = [...plan, staleItem]
      // Act
      results = component.generateStatus(newPlan)
      // Assert
      expect(results.data).toEqual([7, 3, 2])
    })
    it('should be a pie chart', () => {
      expect(results.type).toEqual('pie')
    })
    it('should display a legend', () => {
      expect(results.legend).toBe(true)
    })
    it('should be responsive', () => {
      expect(results.options).toEqual({ responsive: true })
    })
  })

  describe('generateContributionsByMonth', () => {
    let results: IChartDetails

    beforeEach(() => {
      results = component.generateContributionsByMonth(plan)
    })

    it('should start labels with this month', () => {
      const today = new Date()
      expect(results.labels[11]).toEqual([
        component.toMonthAcronym(today.getMonth()),
        today.getFullYear().toString(),
      ])
    })
    it('should sum the points based on month of completedOn date', () => {
      // Arrange
      const newPlan = [...plan, plan[1], { ...plan[0], completedOn: new Date() }]
      // Act
      results = component.generateContributionsByMonth(newPlan)
      // Assert
      expect(results.data).toEqual([
        0,
        0,
        0,
        0,
        0,
        0,
        plan[1].points * 2,
        0,
        0,
        plan[0].points,
        0,
        plan[0].points,
      ])
    })
    it('should be a bar chart', () => {
      expect(results.type).toEqual('bar')
    })
    it('should NOT display a legend', () => {
      expect(results.legend).toBe(false)
    })
    it('should be responsive', () => {
      expect(results.options).toEqual({ responsive: true })
    })
  })

  describe('isStale()', () => {
    let item: IPlanItem
    beforeEach(() => {
      item = { ...plan[0], completed: true }
    })
    it('should return false for today', () => {
      item.completedOn = new Date()
      expect(component.isStale(item)).toBe(false)
    })
    it('should return false for a year ago, today', () => {
      item.completedOn = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
      expect(component.isStale(item)).toBe(false)
    })
    it('should return true for one year and one day ago', () => {
      const today = new Date(new Date().setHours(0, 0, 0))
      const aYearAgo = new Date(today.setFullYear(today.getFullYear() - 1))
      const aYearAndADayAgo = new Date(aYearAgo.setDate(today.getDate() - 1))
      item.completedOn = aYearAndADayAgo
      expect(component.isStale(item)).toBe(true)
    })
  })
})
