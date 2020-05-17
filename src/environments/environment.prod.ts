import { AuthMode } from '../app/auth/auth.enum'

export const environment = {
  production: true,
  api: '/api',
  authMode: AuthMode.FIREBASE,
  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  },
}
