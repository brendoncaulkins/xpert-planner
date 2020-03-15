import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component'

export interface IConfirmation {
  title?: string
  message: string
  accept?: () => any
  cancel?: () => any
}

export interface IDialogService {
  confirm(confirmation: IConfirmation): void
}

@Injectable()
export class DialogService implements IDialogService {
  constructor(private matDialog: MatDialog) {}

  confirm(confirmation: IConfirmation): Observable<boolean> {
    const metadata = {
      title: confirmation.title ? confirmation.title : 'Confirm',
      message: confirmation.message,
    }
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, { data: metadata })
    return dialogRef.afterClosed().pipe(
      tap((accepted: boolean) => {
        if (accepted) {
          if (confirmation.accept) {
            confirmation.accept()
          }
        } else {
          if (confirmation.cancel) {
            confirmation.cancel()
          }
        }
      })
    )
  }
}
