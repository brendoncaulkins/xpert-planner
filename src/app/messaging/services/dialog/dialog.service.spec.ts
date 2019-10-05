import { TestBed } from '@angular/core/testing'
import { MatDialog, MatDialogRef } from '@angular/material'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { of } from 'rxjs'

import { MaterialModule } from '../../../material.module'
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component'
import { DialogService, IConfirmation } from './dialog.service'

describe('DialogService', () => {
  let service: DialogService
  let confirmation: IConfirmation
  let matDialog: MatDialog

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [DialogService],
    })
    matDialog = TestBed.get(MatDialog)
    service = TestBed.get(DialogService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('confirm', () => {
    beforeEach(() => {
      confirmation = {
        title: 'My Confirmation',
        message: 'Are you sure you wrote adequate tests for this?',
        accept: jasmine.createSpy(),
        cancel: jasmine.createSpy(),
      }
    })
    it('should use a default title if one is not provided', () => {
      spyOn(matDialog, 'open').and.returnValue({
        afterClosed: () => of(true),
      } as MatDialogRef<any>)
      service.confirm({ ...confirmation, title: null })
      expect(matDialog.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {
        data: { title: 'Confirm', message: confirmation.message },
      })
    })
    it('should call MatDialog.open()', () => {
      spyOn(matDialog, 'open').and.returnValue({
        afterClosed: () => of(true),
      } as MatDialogRef<any>)
      service.confirm(confirmation)
      expect(matDialog.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {
        data: { title: confirmation.title, message: confirmation.message },
      })
    })
    it('should call accept() when accepted', () => {
      spyOn(matDialog, 'open').and.returnValue({
        afterClosed: () => of(true),
      } as MatDialogRef<any>)
      service.confirm(confirmation)
      expect(confirmation.accept).toHaveBeenCalled()
    })
    it('should call accept() when accepted', () => {
      spyOn(matDialog, 'open').and.returnValue({
        afterClosed: () => of(false),
      } as MatDialogRef<any>)
      service.confirm(confirmation)
      expect(confirmation.cancel).toHaveBeenCalled()
    })
  })
})
