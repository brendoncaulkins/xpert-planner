import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'

import { baseItems, categories } from '../../models/mock.data'
import { IBasePlanItem } from '../../models/xpert-plan.interface'
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
    const dehydratedBaseItems: IBasePlanItem[] = [
      {
        categoryId: 1,
        points: 1,
        type: 'Sample Item',
      } as IBasePlanItem,
      {
        categoryId: 2,
        points: 5,
        type: 'Other Sample Item',
      } as IBasePlanItem,
      {
        categoryId: 2,
        points: 3,
        type: 'A third Item',
      } as IBasePlanItem,
    ]
    it('should provide hydrated baseItems', done => {
      spyOn(service, 'fetch').and.returnValue(of(dehydratedBaseItems))

      service.resolve().subscribe(result => {
        expect(result).toEqual(baseItems)
        done()
      })
    })
  })
})
