import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormArray, FormGroup } from '@angular/forms'

import { AbstractFormComponent } from '../../abstracts/abstract-form/abstract-form.component'
import { IPlanItem } from '../../models/xpert-plan.interface'

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
})
export class ItemListComponent extends AbstractFormComponent<IPlanItem[]>
  implements OnInit, OnDestroy {
  @Input() itemList: IPlanItem[] = [{} as IPlanItem]

  constructor() {
    super()

    this.formGroup = this.buildForm()
  }

  buildForm(): FormGroup {
    return new FormGroup({ plan: new FormArray([]) })
  }

  ngOnInit() {}

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
