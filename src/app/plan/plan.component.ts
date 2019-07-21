import { Component, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { AbstractFormComponent } from '../abstracts/abstract-form/abstract-form.component'
import { ICategory } from '../models/xpert-plan.interface'
import { CategoryService } from '../services/category/category.service'

interface CategoryPoints {
  forecasted: number
  earned: number
}

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
})
export class PlanComponent extends AbstractFormComponent<any>
  implements OnInit, OnDestroy {
  categories$: Observable<ICategory[]>
  categoryPoints$ = new BehaviorSubject<CategoryPoints[]>([])

  totalForecasted$: Observable<number>
  totalEarned$: Observable<number>

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
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
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      plan: this.formBuilder.array([]),
    })
  }

  ngOnInit() {
    this.emitFormReady()
  }

  registerArrayForm(name: string, index: number, control: AbstractControl): void {
    const array = this.formGroup.get(name) as FormArray
    array.setControl(index, control)
  }

  deregisterArrayForm(index: number) {
    const array = this.formGroup.get(name) as FormArray
    array.removeAt(index)
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
