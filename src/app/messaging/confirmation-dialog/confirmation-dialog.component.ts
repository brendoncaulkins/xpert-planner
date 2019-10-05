import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'tcp-confirmation-dialog',
  templateUrl: 'confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
