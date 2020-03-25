import { CommonModule } from '@angular/common'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from '../../../material.module'
import { BaseItemService } from '../../services/base-item/base-item.service'
import { CategoryService } from '../../services/category/category.service'
import { ItemFormComponent } from './item-form.component'

describe('ItemFormComponent', () => {
  let component: ItemFormComponent
  let fixture: ComponentFixture<ItemFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FlexLayoutModule,
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      declarations: [ItemFormComponent],
      providers: [BaseItemService, CategoryService],
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
