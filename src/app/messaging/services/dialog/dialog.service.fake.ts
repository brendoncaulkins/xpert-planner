import { Injectable } from '@angular/core'

import { IConfirmation, IDialogService } from './dialog.service'

@Injectable()
export class MockDialogService implements IDialogService {
  confirm(confirmation: IConfirmation): void {}
}
