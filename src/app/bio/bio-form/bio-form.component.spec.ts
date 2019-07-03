import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BioFormComponent } from './bio-form.component';

describe('BioFormComponent', () => {
  let component: BioFormComponent;
  let fixture: ComponentFixture<BioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
