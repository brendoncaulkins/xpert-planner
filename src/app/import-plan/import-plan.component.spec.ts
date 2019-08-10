import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPlanComponent } from './import-plan.component';

describe('ImportPlanComponent', () => {
  let component: ImportPlanComponent;
  let fixture: ComponentFixture<ImportPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
