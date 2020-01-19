import { CommonModule } from '@angular/common'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from 'src/app/material.module'
import { BaseItemService } from 'src/app/services/base-item/base-item.service'
import { CategoryService } from 'src/app/services/category/category.service'

import { ItemFormComponent } from '../item-form/item-form.component'
import { ItemListComponent } from './item-list.component'

describe('ItemListComponent', () => {
  let component: ItemListComponent
  let fixture: ComponentFixture<ItemListComponent>

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
      declarations: [ItemFormComponent, ItemListComponent],
      providers: [BaseItemService, CategoryService],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
