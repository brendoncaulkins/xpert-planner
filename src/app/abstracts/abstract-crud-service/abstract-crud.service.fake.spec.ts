import { BehaviorSubject } from 'rxjs'
import { filter } from 'rxjs/operators'

import { IAbstractCrudService, IBaseItem } from './abstract-crud.service'
import { AbstractCrudMockService } from './abstract-crud.service.mock'

interface Item extends IBaseItem {
  name: string
}

const items: Item[] = [
  { id: 1, name: 'First Item' },
  { id: 2, name: 'Second Item' },
  { id: 3, name: 'Third Item' },
  { id: 4, name: 'Fourth Item' },
]

class TestMockService extends AbstractCrudMockService<Item>
  implements IAbstractCrudService<Item> {
  endpoint = '/test'

  mockData = items

  constructor() {
    super()
  }
}

describe('AbstractCrudMockService', () => {
  let service: AbstractCrudMockService<Item>

  beforeEach(() => {
    service = new TestMockService()
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
    it('should load the cache', () => {
      service.fetch().subscribe()
      expect(service.list.value).toEqual(items)
    })
    it('should return the fetched list', done => {
      service.fetch().subscribe(data => {
        expect(data).toEqual(items)
        done()
      })
    })
  })

  describe('getById()', () => {
    it('should return the fetched item', done => {
      service.getById(1).subscribe(data => {
        expect(data).toEqual(items.find(i => i.id === 1))
        done()
      })
    })
    it('should return null if the item does not exist', done => {
      service.getById(items.length + 9).subscribe({
        error: err => {
          expect(err).toBe(400)
          done()
        },
      })
    })
  })

  describe('create()', () => {
    let item: Item

    beforeEach(() => {
      item = { name: 'New' } as Item
      service.fetch()
    })

    it('should return the created item', done => {
      service.create(item).subscribe(data => {
        expect(data).toEqual({ id: items.length, ...item })
        done()
      })
    })
    it('should add the item to the cache', done => {
      service.list
        .pipe(filter(list => list.some(i => i.name === item.name)))
        .subscribe(data => {
          expect(data).toContain({ id: items.length, ...item })
          expect(data.length).toEqual(items.length + 1)
          done()
        })
      service.create(item).subscribe()
    })
  })

  describe('update()', () => {
    let item: Item

    beforeEach(() => {
      item = { id: 2, name: 'New' } as Item
      service.fetch()
    })

    it('should return the updated item', done => {
      service.update(item).subscribe(data => {
        expect(data).toEqual(item)
        done()
      })
    })
    it('should update the item in the cache', done => {
      service.list.pipe(filter(list => list.includes(item))).subscribe(data => {
        expect(data).toContain(item)
        expect(data.length).toEqual(items.length)
        done()
      })
      service.update(item).subscribe()
    })
    it('should throw error if the item does not exist', done => {
      item.id = 9
      service.update(item).subscribe({
        error: err => {
          expect(err).toBe(400)
          done()
        },
      })
    })
  })

  describe('delete()', () => {
    let id: number
    let item: Item

    beforeEach(() => {
      id = 3
      item = items.find(i => i.id === id)
      service.fetch()
    })

    it('should return the deleted item', done => {
      service.delete(3).subscribe(data => {
        expect(data).toEqual(items.find(i => i.id === 3))
        done()
      })
    })
    it('should remove the item from the cache', done => {
      service.list.pipe(filter(list => !list.includes(item))).subscribe(data => {
        expect(data).not.toContain(item)
        expect(data.length).toEqual(items.length - 1)
        done()
      })
      service.delete(id).subscribe()
    })
    it('should return null if the item does not exist', done => {
      service.delete(9).subscribe({
        error: err => {
          expect(err).toBe(400)
          done()
        },
      })
    })
  })
})
