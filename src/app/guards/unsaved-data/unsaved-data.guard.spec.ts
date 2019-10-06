import { TestBed, inject } from '@angular/core/testing'
import { MatDialogModule } from '@angular/material'
import { DialogService } from 'src/app/messaging/services/dialog/dialog.service'
import { IPlanItem } from 'src/app/models/xpert-plan.interface'
import { PlanService } from 'src/app/services/plan/plan.service'

import { UnsavedDataGuard } from './unsaved-data.guard'

describe('UnsavedDataGuard', () => {
  let dialogService: DialogService
  let planService: PlanService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [UnsavedDataGuard, DialogService, PlanService],
    })
    dialogService = TestBed.get(DialogService)
    planService = TestBed.get(PlanService)
  })

  it('should implement CanDeactivate', inject(
    [UnsavedDataGuard],
    (guard: UnsavedDataGuard) => {
      expect(guard).toBeTruthy()
      expect(guard.canDeactivate).toBeDefined()
    }
  ))

  describe('hasUnsavedData', () => {
    let plan: IPlanItem[]
    let formData: IPlanItem[]
    let guard: UnsavedDataGuard

    beforeEach(() => {
      guard = new UnsavedDataGuard(dialogService, planService)
      const planItem = {
        description: 'A description',
        baseItem: { type: 'Base Item', points: 5 },
      } as IPlanItem
      plan = [{ ...planItem }]
      formData = [{ ...planItem }]
    })

    it('should return false when formData is an empty array', () => {
      expect(guard.hasUnsavedData(plan, [])).toBe(false)
    })
    it('should return true when the plan and formData are different lengths', () => {
      plan.push({} as IPlanItem)
      expect(guard.hasUnsavedData(plan, formData)).toBe(true)
    })
    it('should return true when the plan and formData have different data', () => {
      formData[0].description = 'Updated Description'
      expect(guard.hasUnsavedData(plan, formData)).toBe(true)
    })
    it('should return false when the plan and formData have the same data', () => {
      expect(guard.hasUnsavedData(plan, formData)).toBe(false)
    })
  })
})
