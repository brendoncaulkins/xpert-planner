import { TestBed, inject } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { MessagingModule } from '../messaging/messaging.module'
import { AuthGuard } from './auth.guard'
import { AuthService } from './services/auth.service'
import { AuthServiceFake } from './services/auth.service.fake'

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MessagingModule],
      providers: [AuthGuard, { provide: AuthService, useClass: AuthServiceFake }],
    })
  })

  it('should be created', inject([AuthGuard], (service: AuthGuard) => {
    expect(service).toBeTruthy()
  }))
})
