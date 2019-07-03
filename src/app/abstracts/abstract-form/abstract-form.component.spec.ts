import { EventEmitter, OnDestroy } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { AbstractFormComponent } from './abstract-form.component'

class BasicAbstractForm extends AbstractFormComponent<any> implements OnDestroy {
  constructor() {
    super()
    this.formGroup = this.buildForm()
  }

  buildForm(): FormGroup {
    return new FormGroup({})
  }

  ngOnDestroy() {
    this.destroyForm.emit()
  }
}

describe('AbstractForm', () => {
  let abstractForm: AbstractFormComponent<any>
  beforeEach(() => {
    abstractForm = new BasicAbstractForm()
  })

  it('should create an instance', () => {
    expect(abstractForm).toBeTruthy()
  })
  it('should provide a formReady emitter', () => {
    expect(abstractForm.formReady instanceof EventEmitter).toBe(true)
  })
  it('should provide a destroyForm emitter', () => {
    expect(abstractForm.destroyForm instanceof EventEmitter).toBe(true)
  })

  describe('#emitFormReady()', () => {
    it('should emit the formGroup by default', done => {
      abstractForm.formReady.subscribe(obj => {
        expect(obj).toBe(abstractForm.formGroup)
        done()
      })
      abstractForm.emitFormReady()
    })
    it('should emit the provided AbstractControl', done => {
      const control = new FormControl('test')
      abstractForm.formReady.subscribe(obj => {
        expect(obj).toBe(control)
        done()
      })
      abstractForm.emitFormReady(control)
    })
  })

  describe('#registerForm()', () => {
    it('should set the provided control to the provided value', () => {
      abstractForm.registerForm('test', new FormControl('water'))
      expect(abstractForm.formGroup.contains('test')).toBe(true)
      expect(abstractForm.formGroup.get('test').value).toBe('water')
    })
  })

  describe('#deregisterForm()', () => {
    it('should remove the control based on name provided', () => {
      // Arrange
      abstractForm.registerForm('test', new FormControl('water'))
      expect(abstractForm.formGroup.contains('test')).toBe(true)
      expect(abstractForm.formGroup.get('test').value).toBe('water')
      // Act
      abstractForm.deregisterForm('test')
      // Assert
      expect(abstractForm.formGroup.contains('test')).toBe(false)
    })
  })
})
