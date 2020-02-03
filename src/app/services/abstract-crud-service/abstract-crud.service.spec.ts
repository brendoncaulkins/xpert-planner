import { doesNotThrow } from 'assert'

import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, of } from 'rxjs'
import { filter } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

import {
  AbstractCrudService,
  IAbstractCrudService,
  IBaseItem,
} from './abstract-crud.service'

interface Item extends IBaseItem {
  name: string
}

const items: Item[] = [
  { id: 1, name: 'First Item' },
  { id: 2, name: 'Second Item' },
  { id: 3, name: 'Third Item' },
  { id: 4, name: 'Fourth Item' },
]

class TestService extends AbstractCrudService<Item>
  implements IAbstractCrudService<Item> {
  endpoint = '/test'

  constructor(protected http: HttpClient) {
    super(http)
  }
}

describe('AbstractCrudService', () => {
  let service: AbstractCrudService<Item>
  let httpMock: jasmine.SpyObj<HttpClient>
  let fullUrl: string

  beforeEach(() => {
    httpMock = jasmine.createSpyObj('HttpClient', [
      'get',
      'put',
      'post',
      'patch',
      'delete',
    ])
    service = new TestService(httpMock)
    fullUrl = `${environment.api}${service.endpoint}`
  })

  describe('constructor', () => {
    it('should have an endpoint', () => {
      expect(service.endpoint).toBe('/test')
    })
    it('should have a list', () => {
      expect(service.list instanceof BehaviorSubject).toBe(true)
    })
  })

  describe('fetch()', () => {
    beforeEach(() => {
      httpMock.get.and.returnValue(of(items))
    })
    it('should fire a GET to the endpoint', done => {
      // Act
      service.fetch().subscribe(data => {
        // Assert
        expect(httpMock.get).toHaveBeenCalledTimes(1)
        expect(httpMock.get).toHaveBeenCalledWith(fullUrl)
        done()
      })
    })
    it('should return the fetched list', done => {
      // Act
      service.fetch().subscribe(data => {
        // Assert
        expect(data).toEqual(items)
        done()
      })
    })
    it('should update the cache', () => {
      // Arrange
      expect(service.list.value).toEqual([])
      // Act
      service.fetch().subscribe()
      // Assert
      expect(service.list.value).toEqual(items)
    })
  })

  describe('getById()', () => {
    let item: Item

    beforeEach(() => {
      item = items.find(i => i.id === 1)
      httpMock.get.and.returnValue(of(item))
    })
    it('should fire a GET to fullUrl/:id', done => {
      service.getById(1).subscribe(() => {
        expect(httpMock.get).toHaveBeenCalledTimes(1)
        expect(httpMock.get).toHaveBeenCalledWith(`${fullUrl}/1`)
        done()
      })
    })
    it('should return the item', done => {
      service.getById(1).subscribe(data => {
        expect(data).toEqual(item)
        done()
      })
    })
  })

  describe('create()', () => {
    let item: Item

    beforeEach(() => {
      item = { name: 'New' } as Item
      httpMock.post.and.returnValue(of({ ...item, id: 5 }))
    })

    it('should fire a POST to the fullUrl', done => {
      service.create(item).subscribe(data => {
        expect(httpMock.post).toHaveBeenCalledTimes(1)
        expect(httpMock.post).toHaveBeenCalledWith(fullUrl, item)
        done()
      })
    })
    it('should return the created item', done => {
      service.create(item).subscribe(data => {
        expect(data).toEqual({ ...item, id: 5 })
        done()
      })
    })
  })

  describe('update()', () => {
    let item: Item

    beforeEach(() => {
      item = { id: 2, name: 'New' } as Item
      httpMock.put.and.returnValue(of(item))
    })

    it('should fire a POST to the fullUrl', done => {
      service.update(item).subscribe(data => {
        expect(httpMock.put).toHaveBeenCalledTimes(1)
        expect(httpMock.put).toHaveBeenCalledWith(fullUrl, item)
        done()
      })
    })
    it('should return the updated item', done => {
      service.update(item).subscribe(data => {
        expect(data).toEqual(item)
        done()
      })
    })
  })

  describe('delete()', () => {
    let id: number
    let item: Item

    beforeEach(() => {
      id = 3
      item = items.find(i => i.id === id)
      httpMock.delete.and.returnValue(of(item))
    })

    it('should hit the API with a DELETE request', done => {
      service.delete(3).subscribe(() => {
        expect(httpMock.delete).toHaveBeenCalledTimes(1)
        expect(httpMock.delete).toHaveBeenCalledWith(`${fullUrl}/3`)
        done()
      })
    })
    it('should return the deleted item', done => {
      service.delete(3).subscribe(data => {
        expect(data).toEqual(item)
        done()
      })
    })
  })

  describe('resolve', () => {
    it('should just call fetch()', () => {
      spyOn(service, 'fetch')
      service.resolve()
      expect(service.fetch).toHaveBeenCalled()
    })
  })
})
