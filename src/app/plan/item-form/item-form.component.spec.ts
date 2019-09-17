import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import {
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatSelectModule,
} from '@angular/material'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from 'src/app/material.module'
import { BaseItemService } from 'src/app/services/base-item/base-item.service'

import { ItemFormComponent } from './item-form.component'

describe('ItemFormComponent', () => {
  let component: ItemFormComponent
  let fixture: ComponentFixture<ItemFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      declarations: [ItemFormComponent],
      providers: [BaseItemService],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
