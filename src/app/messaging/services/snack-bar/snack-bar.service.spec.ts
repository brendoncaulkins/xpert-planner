import { TestBed } from '@angular/core/testing'
import { MatSnackBar } from '@angular/material'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { Observer } from 'rxjs'

import { MaterialModule } from '../../../material.module'
import { SnackBarService } from './snack-bar.service'

describe('SnackBarService', () => {
  let service: SnackBarService
  let matSnackBar: MatSnackBar

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [SnackBarService],
    })

    service = TestBed.get(SnackBarService)
    matSnackBar = TestBed.get(MatSnackBar)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('openSnackBar', () => {
    it('should just call MatSnackBar', () => {
      spyOn(matSnackBar, 'open')
      service.openSnackBar('message')
      expect(matSnackBar.open).toHaveBeenCalledTimes(1)
      expect(matSnackBar.open).toHaveBeenCalledWith('message', null, { duration: 2000 })
    })
    it('should take an optional action string', () => {
      spyOn(matSnackBar, 'open')
      service.openSnackBar('message', 'action')
      expect(matSnackBar.open).toHaveBeenCalledTimes(1)
      expect(matSnackBar.open).toHaveBeenCalledWith('message', 'action', {
        duration: 2000,
      })
    })
  })

  describe('observerFor', () => {
    let observer: Observer<any>

    beforeEach(() => {
      spyOn(service, 'openSnackBar')
      observer = service.observerFor<any>('my action')
    })

    it('should work with only an action as input', () => {
      expect(observer.next).toBeTruthy()
      expect(observer.error).toBeTruthy()
      expect(observer.complete).toBeTruthy()
    })

    describe('.next()', () => {
      it('should call openSnackBar with a success message', () => {
        observer.next({})
        expect(service.openSnackBar).toHaveBeenCalled()
        expect(service.openSnackBar).toHaveBeenCalledWith('my action succeeded!')
      })
      it('should call the passed in next fn', () => {
        const fn = jasmine.createSpy()
        observer = service.observerFor<any>('my action', fn)
        observer.next({ object: true })
        expect(fn).toHaveBeenCalledWith({ object: true })
      })
    })

    describe('.error()', () => {
      it('should call openSnackBar with a fail message', () => {
        observer.error({})
        expect(service.openSnackBar).toHaveBeenCalled()
        expect(service.openSnackBar).toHaveBeenCalledWith('my action failed!')
      })
      it('should call the passed in error fn', () => {
        const fn = jasmine.createSpy()
        observer = service.observerFor<any>('my action', null, fn)
        const error = new Error()
        observer.error(error)
        expect(fn).toHaveBeenCalledWith(error)
      })
    })

    describe('.complete()', () => {
      it('should do nothing by default', () => {
        observer.complete()
        expect(service.openSnackBar).not.toHaveBeenCalled()
      })
      it('should call the passed in complete fn', () => {
        const fn = jasmine.createSpy()
        observer = service.observerFor<any>('my action', null, null, fn)
        observer.complete()
        expect(fn).toHaveBeenCalled()
      })
    })
  })
})
