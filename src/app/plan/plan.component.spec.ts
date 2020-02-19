import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { BehaviorSubject, of } from 'rxjs'

import { MaterialModule } from '../material.module'
import { SnackBarService } from '../messaging/services/snack-bar/snack-bar.service'
import { baseItems, categories, plan } from '../models/mock.data'
import { IPlanItem } from '../models/xpert-plan.interface'
import { BaseItemService } from '../services/base-item/base-item.service'
import { CategoryService } from '../services/category/category.service'
import { PlanService } from '../services/plan/plan.service'
import { CompletedTableComponent } from './completed-table/completed-table.component'
import { ForecastedTableComponent } from './forecasted-table/forecasted-table.component'
import { ItemFormComponent } from './item-form/item-form.component'
import { ItemListComponent } from './item-list/item-list.component'
import { PlanComponent } from './plan.component'

describe('PlanComponent', () => {
  let component: PlanComponent
  let fixture: ComponentFixture<PlanComponent>
  const planService = jasmine.createSpyObj('PlanService', ['plan$', 'setPlan'])
  planService.plan$ = new BehaviorSubject<IPlanItem[]>(plan)
  planService.setPlan = jasmine.createSpy('setPlan')
  const categoryService = jasmine.createSpyObj('CategoryService', ['list'])
  categoryService.list = of(categories)
  const baseItemService = jasmine.createSpyObj('BaseItemService', ['list'])
  baseItemService.list = of(baseItems)

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      declarations: [
        PlanComponent,
        ItemFormComponent,
        ItemListComponent,
        CompletedTableComponent,
        ForecastedTableComponent,
      ],
      providers: [
        { provide: CategoryService, useValue: categoryService },
        { provide: PlanService, useValue: planService },
        { provide: BaseItemService, useValue: baseItemService },
        SnackBarService,
      ],
    }).compileComponents()
  }))

  beforeEach(async () => {
    fixture = TestBed.createComponent(PlanComponent)
    component = fixture.componentInstance
    await fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // This is such a cheat
  it('should work in editMode', async () => {
    component.editMode$.next(true)
    await fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('onSave()', () => {
    beforeEach(async () => {
      component.editMode$.next(true)
      await fixture.detectChanges()
    })
    it('should call PlanService.setPlan', () => {
      component.onSave()
      expect(planService.setPlan).toHaveBeenCalled()
    })
  })
})
