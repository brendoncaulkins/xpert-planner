import { AuthMode } from '../app/auth/auth.enum'
import { firebase } from './firebase.config'

export const environment = {
  production: true,
  api: '/api',
  authMode: AuthMode.FIREBASE,
  firebase,
}
