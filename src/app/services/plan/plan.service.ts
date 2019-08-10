import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { IPlanItem } from 'src/app/models/xpert-plan.interface'

@Injectable()
export class PlanService {
  private planCache$: BehaviorSubject<IPlanItem[]>

  plan$: Observable<IPlanItem[]>

  constructor() {
    this.planCache$ = new BehaviorSubject<IPlanItem[]>([])
    this.plan$ = this.planCache$.asObservable()
  }

  setPlan(plan: IPlanItem[]) {
    this.planCache$.next(plan)
  }
}
