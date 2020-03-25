import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { MaterialModule } from 'src/app/material.module'

import { AuthService } from '../services/auth.service'
import { AuthServiceFake } from '../services/auth.service.fake'
import { LoginComponent } from './login.component'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [LoginComponent],
      providers: [{ provide: AuthService, useCLass: AuthServiceFake }],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
