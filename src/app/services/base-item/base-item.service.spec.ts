import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

import { CategoryService } from '../category/category.service'
import { BaseItemService } from './base-item.service'

describe('BaseItemService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [BaseItemService, CategoryService],
      imports: [HttpClientTestingModule],
    })
  )

  it('should be created', () => {
    const service: BaseItemService = TestBed.get(BaseItemService)
    expect(service).toBeTruthy()
  })
})
