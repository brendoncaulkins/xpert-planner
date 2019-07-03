import { EventEmitter, Input, OnDestroy, Output } from '@angular/core'
import { AbstractControl, FormGroup } from '@angular/forms'

export abstract class AbstractForm<T> implements OnDestroy {
  @Input() data: T
  @Output() formReady: EventEmitter<AbstractControl>
  @Output() destroyForm: EventEmitter<void>
  formGroup: FormGroup

  constructor() {
    this.formReady = new EventEmitter<AbstractControl>(true) // true = async
    this.destroyForm = new EventEmitter<void>(true) // true = async
  }

  abstract buildForm(): FormGroup
  abstract ngOnDestroy(): void

  emitFormReady(control: AbstractControl = null): void {
    this.formReady.emit(control ? control : this.formGroup)
  }

  registerForm(name: string, control: AbstractControl): void {
    this.formGroup.setControl(name, control)
  }

  deregisterForm(name: string): void {
    if (this.formGroup.contains(name)) {
      this.formGroup.removeControl(name)
    }
  }
}
