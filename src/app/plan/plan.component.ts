import { Component, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { MatSlideToggleChange } from '@angular/material'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, take, tap } from 'rxjs/operators'
import { SubSink } from 'subsink'

import { AbstractFormComponent } from '../abstracts/abstract-form/abstract-form.component'
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

  totalForecasted$: Observable<number>
  totalEarned$: Observable<number>

  editMode$ = new BehaviorSubject<boolean>(false)

  subs = new SubSink()

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private planService: PlanService
  ) {
    super()
    this.formGroup = this.buildForm()
    this.categories$ = this.categoryService.list

    this.totalForecasted$ = this.categoryPoints$.pipe(
      map(points =>
        points.map(p => (p ? p.forecasted : 0)).reduce((p, c, i, ary) => p + c, 0)
      )
    )

    this.totalEarned$ = this.categoryPoints$.pipe(
      map(points =>
        points.map(p => (p ? p.earned : 0)).reduce((p, c, i, ary) => p + c, 0)
      )
    )

    this.subs.add(
      this.formGroup.valueChanges.subscribe((formData: { plan: IPlanItem[] }) => {
        const flattenedFormData: IPlanItem[] = formData.plan
          .reduce((p: IPlanItem[], c: IPlanItem) => p.concat(c), [])
          .filter((i: IPlanItem) => i.points) // remove unused items
        this.planService.setPlan(flattenedFormData)
      })
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

  onModeChange(changeEvent: MatSlideToggleChange) {
    console.log(changeEvent)
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

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

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
