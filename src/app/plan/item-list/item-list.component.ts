import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs'
import { distinctUntilChanged, map, tap } from 'rxjs/operators'

import { AbstractFormComponent } from '../../abstracts/abstract-form/abstract-form.component'
import { IPlanItem } from '../../models/xpert-plan.interface'

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
})
export class ItemListComponent extends AbstractFormComponent<IPlanItem[]>
  implements OnInit, OnDestroy {
  @Input() itemList: IPlanItem[] = [{} as IPlanItem]
  @Input() categoryId: number

  @Output() forecastedPoints$: Observable<number>
  @Output() earnedPoints$: Observable<number>

  constructor() {
    super()

    this.formGroup = this.buildForm()

    this.forecastedPoints$ = this.formGroup.valueChanges.pipe(
      map(category => category.categoryPlan),
      map((items: IPlanItem[]) =>
        items.map(i => i.points).reduce((p, c, i, ary) => p + c, 0)
      ),
      distinctUntilChanged()
    )
    this.earnedPoints$ = this.formGroup.valueChanges.pipe(
      map(category => category.categoryPlan),
      map((items: IPlanItem[]) =>
        items.map(i => (i.completed ? i.points : 0)).reduce((p, c, i, ary) => p + c, 0)
      ),
      distinctUntilChanged()
    )
  }

  buildForm(): FormGroup {
    return new FormGroup({ categoryPlan: new FormArray([]) })
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

  onAddItem() {
    this.itemList.push({} as IPlanItem)
  }

  onDelete(index: number) {
    this.itemList.splice(index, 1)
  }

  ngOnDestroy() {}
}
