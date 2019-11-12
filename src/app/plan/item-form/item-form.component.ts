import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { filter, map, startWith } from 'rxjs/operators'
import { SubSink } from 'subsink'

import { AbstractFormComponent } from '../../abstracts/abstract-form/abstract-form.component'
import { IBasePlanItem, IPlanItem } from '../../models/xpert-plan.interface'
import { BaseItemService } from '../../services/base-item/base-item.service'
import { hasChanged } from '../../utils/functions'

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent extends AbstractFormComponent<IPlanItem>
  implements OnInit, OnChanges, OnDestroy {
  @Input() item: IPlanItem
  @Input() categoryFilter: number

  subs = new SubSink()
  items$: Observable<IBasePlanItem[]>

  constructor(private formBuilder: FormBuilder, public baseItemService: BaseItemService) {
    super()

    this.formGroup = this.buildForm()

    this.items$ = this.baseItemService.list.pipe(
      map(list => list.filter(item => item.category.id === this.categoryFilter))
    )

    this.subs.add(
      this.completed.valueChanges
        .pipe(startWith(this.completed.value))
        .subscribe(completed =>
          completed ? this.completedOn.enable() : this.completedOn.disable()
        ),
      this.baseItem.valueChanges
        .pipe(filter(i => !!i))
        .subscribe((item: IBasePlanItem) => {
          if (!this.points.value) {
            this.points.setValue(item.points)
          }
        })
    )
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      baseItem: [null, Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      points: [0, [Validators.required, Validators.min(1)]],
      completed: [false],
      completedOn: [null, Validators.required, null, { disabled: true }],
    })
  }

  ngOnInit() {
    if (this.item && this.item.baseItem) {
      this.formGroup.patchValue(this.item)
    }
    this.emitFormReady()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.data && hasChanged(changes.data)) {
      this.formGroup.patchValue(this.data)
    }
  }

  ngOnDestroy() {
    this.destroyForm.emit()
  }

  /*  GETTERS  */

  get baseItem(): AbstractControl {
    return this.formGroup.get('baseItem')
  }
  get description(): AbstractControl {
    return this.formGroup.get('description')
  }
  get points(): AbstractControl {
    return this.formGroup.get('points')
  }
  get completed(): AbstractControl {
    return this.formGroup.get('completed')
  }
  get completedOn(): AbstractControl {
    return this.formGroup.get('completedOn')
  }
}
