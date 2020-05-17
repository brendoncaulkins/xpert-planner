import { HttpClient } from '@angular/common/http'
import { AngularFireFunctions } from '@angular/fire/functions'

import { environment } from '../../../../environments/environment'
import { AuthMode } from '../../../auth/auth.enum'
import { CategoryService } from '../category/category.service'
import { BaseItemFirebaseService } from './base-item.firebase.service'
import { BaseItemService } from './base-item.service'

export function baseItemFactory(
  httpClient: HttpClient,
  fireFunctions: AngularFireFunctions,
  categoryService: CategoryService
) {
  switch (environment.authMode) {
    case AuthMode.IN_MEMORY:
      return new BaseItemService(httpClient, categoryService)
    case AuthMode.FIREBASE:
      return new BaseItemFirebaseService(fireFunctions, categoryService)
  }
}
