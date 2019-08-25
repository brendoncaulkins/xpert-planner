import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { ExportPlanComponent } from './export-plan.component'

describe('ExportPlanComponent', () => {
  let component: ExportPlanComponent
  let fixture: ComponentFixture<ExportPlanComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExportPlanComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportPlanComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
