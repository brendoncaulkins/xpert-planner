import { Injectable } from '@angular/core'
import { CanDeactivate } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

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
      map(hasUnsaved => (hasUnsaved ? this.doConfirm(component) : true))
    )
  }

  hasUnsavedData(plan: IPlanItem[], formData: IPlanItem[]): boolean {
    console.log(plan, formData)
    // Quick check on new/deleted elements
    if (formData.length !== plan.length) {
      return true
    }

    // Changes to existing items, or equal # of adds/deletes
    formData.forEach(item => {
      if (!plan.includes(item)) {
        return true
      }
    })

    return false
  }

  doConfirm(component: PlanComponent): boolean {
    return this.dialogService.confirm({
      message:
        'You have unsaved plan changes.  Would you like to save these changes before leaving?',
      accept: () => component.onSave(),
      cancel: () => {},
    })
  }
}
