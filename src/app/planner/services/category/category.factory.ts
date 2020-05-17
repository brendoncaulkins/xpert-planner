import { HttpClient } from '@angular/common/http'
import { AngularFireFunctions } from '@angular/fire/functions'

import { environment } from '../../../../environments/environment'
import { AuthMode } from '../../../auth/auth.enum'
import { CategoryFirebaseService } from './category.firebase.service'
import { CategoryService } from './category.service'

export function categoryFactory(
  httpClient: HttpClient,
  fireFunctions: AngularFireFunctions
) {
  switch (environment.authMode) {
    case AuthMode.IN_MEMORY:
      return new CategoryService(httpClient)
    case AuthMode.FIREBASE:
      return new CategoryFirebaseService(fireFunctions)
  }
}
