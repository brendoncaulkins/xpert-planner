import { CommonModule } from '@angular/common'
import { TestBed, async } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'

import { AppComponent } from './app.component'
import { AuthService } from './auth/services/auth.service'
import { AuthServiceFake } from './auth/services/auth.service.fake'
import { HomeComponent } from './home/home.component'
import { MaterialModule } from './material.module'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HomeComponent],
      imports: [CommonModule, MaterialModule, NoopAnimationsModule, RouterTestingModule],
      providers: [{ provide: AuthService, useClass: AuthServiceFake }],
    }).compileComponents()
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  })
})
