import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'

import { baseItems, categories } from '../../models/mock.data'
import { CategoryService } from '../category/category.service'
import { BaseItemService } from './base-item.service'

describe('BaseItemService', () => {
  let service: BaseItemService
  const categoryService = jasmine.createSpyObj('CategoryService', ['fetch'])
  categoryService.fetch = jasmine.createSpy('fetch').and.returnValue(of(categories))
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseItemService,
        { provide: CategoryService, useValue: categoryService },
      ],
      imports: [HttpClientTestingModule],
    })
    service = TestBed.get(BaseItemService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('resolve()', () => {
    it('should provide hydrated baseItems', done => {
      const dehydratedBaseItems = baseItems.map(i => ({ ...i, category: null }))
      spyOn(service, 'fetch').and.returnValue(of(dehydratedBaseItems))

      service.resolve().subscribe(result => {
        expect(result).toEqual(baseItems)
        done()
      })
    })
  })
})
