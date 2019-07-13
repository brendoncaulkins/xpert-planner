import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
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
  implements OnChanges, OnDestroy {
  @Input() item: IPlanItem
  @Output() delete = new EventEmitter<void>(true)
  subs = new SubSink()
  categories$: Observable<ICategory[]>

  constructor(private formBuilder: FormBuilder, public baseItemService: BaseItemService) {
    super()

    this.formGroup = this.buildForm()

    this.categories$ = this.baseItemService.list.pipe(
      map(items =>
        items
          .map(i => i.category)
          .reduce((p, c, i, ary) => {
            if (p.every(x => x.id !== c.id)) {
              p.push(c)
            }
            return p
          }, [])
      )
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
      completedOn: [null, Validators.required, { disabled: true }],
    })
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

  itemsByCategory(category: ICategory): IBasePlanItem[] {
    return this.baseItemService.list.value.filter(i => i.category.id === category.id)
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
