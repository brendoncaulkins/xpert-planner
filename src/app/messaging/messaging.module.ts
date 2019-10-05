import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from '../material.module'
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component'
import { DialogService } from './services/dialog/dialog.service'
import { SnackBarService } from './services/snack-bar/snack-bar.service'

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [CommonModule, MaterialModule, BrowserAnimationsModule],
  providers: [SnackBarService, DialogService],
  entryComponents: [ConfirmationDialogComponent],
})
export class MessagingModule {}
