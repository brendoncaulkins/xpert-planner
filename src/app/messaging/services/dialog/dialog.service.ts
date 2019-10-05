import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material'

import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component'

export interface IConfirmation {
  title?: string
  message: string
  accept: () => any
  cancel: () => any
}

export interface IDialogService {
  confirm(confirmation: IConfirmation): void
}

@Injectable()
export class DialogService implements IDialogService {
  constructor(private matDialog: MatDialog) {}

  confirm(confirmation: IConfirmation): void {
    const metadata = {
      title: confirmation.title ? confirmation.title : 'Confirm',
      message: confirmation.message,
    }
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, { data: metadata })
    dialogRef.afterClosed().subscribe((accepted: boolean) => {
      if (accepted) {
        confirmation.accept()
      } else {
        confirmation.cancel()
      }
    })
  }
}
