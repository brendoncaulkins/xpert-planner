import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { filter } from 'rxjs/operators'
import { MessagingModule } from 'src/app/messaging/messaging.module'

import { Role } from '../auth.enum'
import { AuthService, defaultAuthStatus } from './auth.service'

describe('AuthService', () => {
  let service: AuthService
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MessagingModule],
      providers: [AuthService],
    })
    service = TestBed.inject(AuthService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('logout', () => {
    it('should push the default authStatus', done => {
      const mockStatus = {
        isAuthenticated: true,
        userRole: Role.User,
        userId: '1234',
      }
      service.authStatus$.next(mockStatus)
      service.authStatus$
        .pipe(filter(status => status !== mockStatus))
        .subscribe(status => {
          expect(status).toEqual(defaultAuthStatus)
          done()
        })

      service.logout()
    })
  })
})
