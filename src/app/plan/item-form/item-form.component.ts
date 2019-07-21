import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { BaseItemService } from 'src/app/services/base-item/base-item.service'
import { SubSink } from 'subsink'

import { AbstractFormComponent } from '../../abstracts/abstract-form/abstract-form.component'
import { IBasePlanItem, ICategory, IPlanItem } from '../../models/xpert-plan.interface'
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
  @Output() delete = new EventEmitter<void>(true)
  subs = new SubSink()
  items$: Observable<IBasePlanItem[]>

  constructor(private formBuilder: FormBuilder, public baseItemService: BaseItemService) {
    super()

    this.formGroup = this.buildForm()

    this.items$ = this.baseItemService.list.pipe(
      map(list => list.filter(item => item.category.id === this.categoryFilter))
    )

    this.subs.add(
      this.completed.valueChanges.subscribe(completed =>
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
      points: [0, [Validators.required]],
      completed: [false],
      completedOn: [null, Validators.required, null, { disabled: true }],
    })
  }

  ngOnInit() {
    this.emitFormReady()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.data && hasChanged(changes.data)) {
      this.formGroup.patchValue(this.data)
    }
  }

  onDelete() {
    this.delete.emit()
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
