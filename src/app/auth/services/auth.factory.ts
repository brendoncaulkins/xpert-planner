import { AngularFireAuth } from '@angular/fire/auth'
import { SnackBarService } from 'src/app/messaging/services/snack-bar/snack-bar.service'

import { environment } from '../../../environments/environment'
import { AuthMode } from '../auth.enum'
import { FirebaseAuthService } from './auth.firebase.service'
import { InMemoryAuthService } from './auth.inmemory.service'

export function authFactory(afAuth: AngularFireAuth, snackBarService: SnackBarService) {
  switch (environment.authMode) {
    case AuthMode.IN_MEMORY:
      return new InMemoryAuthService(snackBarService)
    case AuthMode.FIREBASE:
      return new FirebaseAuthService(afAuth, snackBarService)
  }
}
