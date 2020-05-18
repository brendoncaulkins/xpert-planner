import { TestBed } from '@angular/core/testing'
import { MatDialogModule } from '@angular/material/dialog'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { of } from 'rxjs'

import { DialogService } from '../../../messaging/services/dialog/dialog.service'
import { plan } from '../../models/mock.data'
import { IPlanItem } from '../../models/xpert-plan.interface'
import { PlanComponent } from '../../plan/plan.component'
import { PlanService } from '../../services/plan/plan.service'
import { UnsavedDataGuard } from './unsaved-data.guard'

describe('UnsavedDataGuard', () => {
  let dialogService: DialogService
  const planService = jasmine.createSpyObj('PlanService', ['plan$'])

  beforeEach(() => {
    planService.plan$ = of(plan)
    TestBed.configureTestingModule({
      imports: [MatDialogModule, NoopAnimationsModule],
      providers: [
        UnsavedDataGuard,
        DialogService,
        { provide: PlanService, useValue: planService },
      ],
    })
    dialogService = TestBed.get(DialogService)
  })

  describe('canDeactivate', () => {
    let guard: UnsavedDataGuard
    let planComponent: PlanComponent

    beforeEach(() => {
      planComponent = jasmine.createSpyObj('PlanComponent', ['getFormPlan'])
      guard = new UnsavedDataGuard(dialogService, planService)
    })

    it('should implement correctly', () => {
      expect(guard).toBeTruthy()
      expect(guard.canDeactivate).toBeDefined()
    })
    it('should return true when there is no unsaved data', done => {
      planComponent.getFormPlan = jasmine.createSpy('getFormPlan').and.returnValue(plan)

      spyOn(guard, 'hasUnsavedData').and.callThrough()
      guard.canDeactivate(planComponent).subscribe(result => {
        expect(guard.hasUnsavedData).toHaveBeenCalled()
        expect(result).toBe(true)
        done()
      })
    })
    it('should ask for confirmation when there is unsaved data', done => {
      planComponent.getFormPlan = jasmine
        .createSpy('getFormPlan')
        .and.returnValue(plan.slice(1))

      spyOn(guard, 'doConfirm').and.returnValue(of(true))
      guard.canDeactivate(planComponent).subscribe(result => {
        expect(guard.doConfirm).toHaveBeenCalled()
        expect(result).toBe(true)
        done()
      })
    })
  })

  describe('hasUnsavedData', () => {
    let formData: IPlanItem[]
    let guard: UnsavedDataGuard

    beforeEach(() => {
      guard = new UnsavedDataGuard(dialogService, planService)
      formData = plan.map(i => ({ ...i }))
    })

    it('should return false when formData is an empty array', () => {
      expect(guard.hasUnsavedData(plan, [])).toBe(false)
    })
    it('should return true when the plan and formData are different lengths', () => {
      const testPlan = [...plan]
      testPlan.push({} as IPlanItem)
      expect(guard.hasUnsavedData(testPlan, formData)).toBe(true)
    })
    it('should return true when the plan and formData have different data', () => {
      formData[0].description = 'Updated Description'
      expect(guard.hasUnsavedData(plan, formData)).toBe(true)
    })
    it('should return false when the plan and formData have the same data', () => {
      expect(guard.hasUnsavedData(plan, formData)).toBe(false)
    })
  })

  describe('doConfirm', () => {
    let guard: UnsavedDataGuard
    let planComponent: PlanComponent

    beforeEach(() => {
      planComponent = jasmine.createSpyObj('PlanComponent', ['getFormPlan', 'onSave'])
      planComponent.onSave = jasmine.createSpy('onSave')
      guard = new UnsavedDataGuard(dialogService, planService)
    })
    it('should call the dialogService', () => {
      spyOn(dialogService, 'confirm').and.callThrough()
      guard.doConfirm(planComponent)
      expect(dialogService.confirm).toHaveBeenCalled()
    })
  })
})
