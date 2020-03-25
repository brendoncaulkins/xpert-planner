import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { AuthService } from '../services/auth.service'
import { AuthServiceFake } from '../services/auth.service.fake'
import { LogoutComponent } from './logout.component'

describe('LogoutComponent', () => {
  let component: LogoutComponent
  let fixture: ComponentFixture<LogoutComponent>
  let authService: AuthService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutComponent],
      providers: [{ provide: AuthService, useClass: AuthServiceFake }],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent)
    component = fixture.componentInstance
    authService = TestBed.inject(AuthService)
    spyOn(authService, 'logout')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call authService.logout()', () => {
    expect(authService.logout).toHaveBeenCalled()
  })
})
