import { Component, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'

import { AbstractFormComponent } from '../abstracts/abstract-form/abstract-form.component'
import { SnackBarService } from '../messaging/services/snack-bar/snack-bar.service'
import { ICategory, IPlanItem } from '../models/xpert-plan.interface'
import { CategoryService } from '../services/category/category.service'
import { PlanService } from '../services/plan/plan.service'

interface CategoryPoints {
  forecasted: number
  earned: number
}

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
})
export class PlanComponent extends AbstractFormComponent<any>
  implements OnInit, OnDestroy {
  categories$: Observable<ICategory[]>
  categoryPoints$ = new BehaviorSubject<CategoryPoints[]>([])

  completedItems$: Observable<IPlanItem[]>
  forecastedItems$: Observable<IPlanItem[]>
  totalForecasted$: Observable<number>
  totalEarned$: Observable<number>
  totalEarnedPastSixMonths$: Observable<number>

  editMode$ = new BehaviorSubject<boolean>(false)

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private planService: PlanService,
    private snackBarService: SnackBarService
  ) {
    super()
    this.formGroup = this.buildForm()
    this.categories$ = this.categoryService.list

    // Forecasted data
    this.forecastedItems$ = this.planService.plan$.pipe(
      map(items => items.filter(i => !i.completed))
    )
    this.totalForecasted$ = this.forecastedItems$.pipe(
      map(items => items.reduce((p, c) => p + c.points, 0))
    )

    // Completed data
    this.completedItems$ = this.planService.plan$.pipe(
      map(items => items.filter(i => i.completed))
    )
    this.totalEarned$ = this.completedItems$.pipe(
      map(items => items.reduce((p, c) => p + c.points, 0))
    )

    const sixMonthsAgo = new Date()
    sixMonthsAgo.setDate(1)
    sixMonthsAgo.setMonth(new Date().getMonth() - 5)

    this.totalEarnedPastSixMonths$ = this.completedItems$.pipe(
      map(items =>
        items
          .filter(i => i.completedOn.getTime() > sixMonthsAgo.getTime())
          .reduce((p, c) => p + c.points, 0)
      )
    )
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      plan: this.formBuilder.array([]),
    })
  }

  ngOnInit() {
    this.emitFormReady()
  }

  getFormPlan(): IPlanItem[] {
    return this.plan.value
      .reduce((p: IPlanItem[], c: IPlanItem) => p.concat(c), [])
      .filter((i: IPlanItem) => i.points) // remove unused items
  }

  onSave() {
    const flattenedFormData: IPlanItem[] = this.getFormPlan()

    this.planService.setPlan(flattenedFormData)
    this.snackBarService.openSnackBar('Plan saved successfully!')
  }

  planItemsByCategory(categoryId: number): Observable<IPlanItem[]> {
    return this.planService.plan$.pipe(
      map(plan =>
        plan.filter(i => (i.baseItem ? i.baseItem.category.id === categoryId : false))
      ),
      take(1)
    )
  }

  registerArrayForm(index: number, control: AbstractControl): void {
    this.plan.setControl(index, control)
  }

  deregisterArrayForm(index: number) {
    this.plan.removeAt(index)
  }

  ngOnDestroy() {}

  setPointsForecasted(index: number, points: number) {
    const currentPoints = this.categoryPoints$.value
    currentPoints[index] = { ...currentPoints[index], forecasted: points }
    this.categoryPoints$.next(currentPoints)
  }

  setPointsEarned(index: number, points: number) {
    const currentPoints = this.categoryPoints$.value
    currentPoints[index] = { ...currentPoints[index], earned: points }
    this.categoryPoints$.next(currentPoints)
  }

  getPointsDisplayByIndex(index: number): Observable<string> {
    return this.categoryPoints$.pipe(
      map(points =>
        points[index]
          ? `Forecasted: ${points[index].forecasted}, Earned: ${points[index].earned}`
          : 'Forecasted: Unknown, Earned: Unknown'
      )
    )
  }

  get plan(): FormArray {
    return this.formGroup.get('plan') as FormArray
  }
}
