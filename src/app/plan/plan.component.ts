import { Component, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs'
import { map, startWith, tap } from 'rxjs/operators'

import { AbstractFormComponent } from '../abstracts/abstract-form/abstract-form.component'
import { ICategory, IPlanItem } from '../models/xpert-plan.interface'
import { CategoryService } from '../services/category/category.service'

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
})
export class PlanComponent extends AbstractFormComponent<any>
  implements OnInit, OnDestroy {
  categories$: Observable<ICategory[]>

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    super()
    this.formGroup = this.buildForm()
    this.categories$ = this.categoryService.list
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

  get plan(): FormArray {
    return this.formGroup.get('plan') as FormArray
  }
}
