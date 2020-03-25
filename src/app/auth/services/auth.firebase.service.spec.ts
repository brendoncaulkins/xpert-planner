import { userInfo } from 'os'

import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { AngularFireAuth } from '@angular/fire/auth'
import { User as FirebaseUser } from 'firebase'
import { filter } from 'rxjs/operators'

import { MessagingModule } from '../../messaging/messaging.module'
import { User } from '../../user/user'
import { Role } from '../auth.enum'
import { FirebaseAuthService } from './auth.firebase.service'

const angularFireStub = {
  user: jasmine.createSpyObj('user', ['subscribe']),
  auth: jasmine.createSpyObj('auth', ['signInWithEmailAndPassword', 'signOut']),
}

// {
//  "sub": "1234567890",
//  "name": "John Doe",
//  "email": "test@test.com",
//  "admin": true,
//  "jti": "f6711524-f412-4bd9-9d31-648e89e6ec8c",
//  "iat": 1585176920,
//  "exp": 1585180520
// }
const mockUser: FirebaseUser = {
  getIdToken() {
    return Promise.resolve(
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiYWRtaW4iOnRydWUsImp0aSI6ImY2NzExNTI0LWY0MTItNGJkOS05ZDMxLTY0OGU4OWU2ZWM4YyIsImlhdCI6MTU4NTE3NjkyMCwiZXhwIjoxNTg1MTgwNTQ3fQ.GVynX4K0uNK-nrzmnaEapq-vqvk6nW43GX-8HykVj68'
    )
  },
} as FirebaseUser

describe('FirebaseAuthService', () => {
  let service: FirebaseAuthService
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MessagingModule],
      providers: [
        FirebaseAuthService,
        { provide: AngularFireAuth, useValue: angularFireStub },
      ],
    })
    service = TestBed.inject(FirebaseAuthService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should support logging in via email/password', done => {
    angularFireStub.auth.signInWithEmailAndPassword.and.returnValue(
      Promise.resolve({ user: mockUser })
    )
    service.authStatus$.pipe(filter(v => v.isAuthenticated)).subscribe(authStatus => {
      expect(authStatus.isAuthenticated).toBe(true)
      done()
    })
    service.login('test@test.com', 'password')
  })

  describe('transformFirebaseUser()', () => {
    let firebaseUser: FirebaseUser

    beforeEach(() => {
      firebaseUser = {
        displayName: 'John Doe',
        photoURL: 'http://photo',
        email: 'test@test.com',
        uid: '12345abcde',
      } as FirebaseUser
    })

    it('should return a new User if passed null', () => {
      expect(service.transformFirebaseUser(null) instanceof User).toBe(true)
    })

    it('should use a default name', () => {
      firebaseUser.displayName = undefined
      expect(service.transformFirebaseUser(firebaseUser).name).toEqual({
        first: 'Firebase',
        last: 'User',
      })
    })

    it('should transform the Firebase User', () => {
      const user = service.transformFirebaseUser(firebaseUser)
      expect(user instanceof User).toBe(true)
      expect(user.name).toEqual({ first: 'John', last: 'Doe' })
      expect(user.email).toBe(firebaseUser.email)
      expect(user.picture).toBe(firebaseUser.photoURL)
      expect(user.role).toBe(Role.User)
      expect(user._id).toBe(firebaseUser.uid)
    })
  })
})
