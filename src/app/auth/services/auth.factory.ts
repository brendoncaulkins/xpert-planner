import { HttpClient } from '@angular/common/http'
import { AngularFireAuth } from '@angular/fire/auth'

import { environment } from '../../../environments/environment'
import { AuthMode } from '../auth.enum'
import { FirebaseAuthService } from './auth.firebase.service'
import { InMemoryAuthService } from './auth.inmemory.service'

export function authFactory(afAuth: AngularFireAuth, httpClient: HttpClient) {
  switch (environment.authMode) {
    case AuthMode.IN_MEMORY:
      return new InMemoryAuthService()
    case AuthMode.FIREBASE:
      return new FirebaseAuthService(afAuth)
  }
}
