import { Injectable } from '@angular/core'
import { CanDeactivate } from '@angular/router'
import { Observable, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

import { DialogService } from '../../messaging/services/dialog/dialog.service'
import { IPlanItem } from '../../models/xpert-plan.interface'
import { PlanComponent } from '../../plan/plan.component'
import { PlanService } from '../../services/plan/plan.service'

@Injectable()
export class UnsavedDataGuard implements CanDeactivate<PlanComponent> {
  constructor(private dialogService: DialogService, private planService: PlanService) {}

  canDeactivate(component: PlanComponent): Observable<boolean> {
    return this.planService.plan$.pipe(
      map(plan => this.hasUnsavedData(plan, component.getFormPlan())),
      switchMap(hasUnsaved => (hasUnsaved ? this.doConfirm(component) : of(true)))
    )
  }

  hasUnsavedData(plan: IPlanItem[], formData: IPlanItem[]): boolean {
    // If formData hasn't been loaded yet,
    // the user can't have made any changes
    if (formData.length === 0) {
      return false
    }

    // Quick check on new/deleted elements
    if (formData.length !== plan.length) {
      return true
    }

    // Look for any differences that haven't been saved
    // If they're identical, no unsaved data
    return !this.arrayCompare(plan, formData)
  }

  arrayCompare(a: any[], b: any[]): boolean {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  doConfirm(component: PlanComponent): Observable<boolean> {
    return this.dialogService.confirm({
      message:
        'You have unsaved plan changes.  Would you like to save these changes before leaving?',
      accept: () => component.onSave(),
      cancel: () => {},
    })
  }
}
