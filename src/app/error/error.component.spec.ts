import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { ErrorComponent } from './error.component'

describe('ErrorComponent', () => {
  let component: ErrorComponent
  let fixture: ComponentFixture<ErrorComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display "Error!" in h1 tags', () => {
    const header = fixture.debugElement.query(By.css('h1'))
    expect(header.nativeElement.textContent).toEqual('Error!')
  })
})
