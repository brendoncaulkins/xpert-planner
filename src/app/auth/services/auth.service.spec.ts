import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed, inject } from '@angular/core/testing'
import { MessagingModule } from 'src/app/messaging/messaging.module'

import { InMemoryAuthService } from './auth.inmemory.service'
import { AuthService } from './auth.service'

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
})
