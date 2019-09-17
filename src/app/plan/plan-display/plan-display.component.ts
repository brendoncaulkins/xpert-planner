import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { IPlanItem } from 'src/app/models/xpert-plan.interface'
import { PlanService } from 'src/app/services/plan/plan.service'

@Component({
  selector: 'app-plan-display',
  templateUrl: './plan-display.component.html',
  styleUrls: ['./plan-display.component.css'],
})
export class PlanDisplayComponent {
  completedPlanItems$: Observable<IPlanItem[]>
  forecastedPlanItems$: Observable<IPlanItem[]>

  constructor(private planService: PlanService) {
    this.completedPlanItems$ = this.planService.plan$.pipe(
      map(items => items.filter(i => i.completed))
    )

    this.forecastedPlanItems$ = this.planService.plan$.pipe(
      map(items => items.filter(i => !i.completed))
    )
  }
}
