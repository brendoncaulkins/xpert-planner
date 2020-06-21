import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { AbstractControl, FormArray, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs'
import { distinctUntilChanged, map, tap } from 'rxjs/operators'

import { AbstractFormComponent } from '../../../abstracts/abstract-form/abstract-form.component'
import { IPlanItem } from '../../models/xpert-plan.interface'

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
})
export class ItemListComponent extends AbstractFormComponent<IPlanItem[]>
  implements OnInit, OnDestroy {
  @Input() initialData: IPlanItem[] = []
  @Input() categoryId: number

  @Output() forecastedPoints$: Observable<number>
  @Output() earnedPoints$: Observable<number>

  itemList: IPlanItem[] = [{} as IPlanItem]

  constructor() {
    super()

    this.formGroup = this.buildForm()

    this.forecastedPoints$ = this.plan.valueChanges.pipe(
      map((items: IPlanItem[]) =>
        items.map(i => i.points).reduce((p, c, i, ary) => p + c, 0)
      ),
      distinctUntilChanged()
    )
    this.earnedPoints$ = this.plan.valueChanges.pipe(
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
    this.itemList = this.initialData.length > 0 ? this.initialData : this.itemList
    this.plan.patchValue(this.itemList, { onlySelf: true, emitEvent: false })
    this.emitFormReady(this.plan)
  }

  registerArrayForm(index: number, control: AbstractControl): void {
    this.plan.setControl(index, control)
  }

  deregisterArrayForm(index: number) {
    this.plan.removeAt(index)
    this.plan.updateValueAndValidity()
  }

  onAddItem() {
    this.itemList.push({} as IPlanItem)
  }

  onDelete(index: number) {
    this.itemList.splice(index, 1)
  }

  ngOnDestroy() {
    this.destroyForm.emit()
  }

  get plan(): FormArray {
    return this.formGroup.get('categoryPlan') as FormArray
  }
}
