import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed, inject } from '@angular/core/testing'
import { MessagingModule } from 'src/app/messaging/messaging.module'

import { AuthService } from './auth.service'

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MessagingModule],
      providers: [AuthService],
    })
  })

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy()
  }))
})
