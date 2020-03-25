import { CacheService } from './abstract-cache.service'

class TestCacheService extends CacheService {
  get<T>(key: string): T {
    return this.getItem(key)
  }

  set(key: string, data: object | string) {
    this.setItem(key, data)
  }

  delete(key: string) {
    this.removeItem(key)
  }

  clearItems() {
    this.clear()
  }
}

describe('CacheService', () => {
  let service: TestCacheService

  beforeEach(() => {
    service = new TestCacheService()
  })

  // Important for test stability
  afterEach(() => {
    localStorage.clear()
  })

  describe('getItem()', () => {
    it('should try to find the key in localStorage', () => {
      spyOn(localStorage, 'getItem')
      service.get('test')
      expect(localStorage.getItem).toHaveBeenCalledWith('test')
    })
    it('should return null if nothing is found', () => {
      expect(service.get('test')).toBe(null)
    })
    it('should return the JSON.parse()-d result', () => {
      spyOn(localStorage, 'getItem').and.returnValue('{"value":true}')
      expect(service.get('test')).toEqual({ value: true })
    })
  })

  describe('setItem()', () => {
    it('should store a string successfully', () => {
      service.set('test', 'a value')
      expect(service.get('test')).toEqual('a value')
    })
    it('should store an object successfully', () => {
      service.set('test', { a: 'value' })
      expect(service.get('test')).toEqual({ a: 'value' })
    })
  })

  describe('removeItem()', () => {
    it('should remove an item from localStorage', () => {
      service.set('test', 'a value')
      expect(service.get('test')).toEqual('a value')
      service.delete('test')
      expect(service.get('test')).toBe(null)
    })
  })

  describe('clear()', () => {
    it('should call localSTorage.clear()', () => {
      spyOn(localStorage, 'clear')
      service.clearItems()
      expect(localStorage.clear).toHaveBeenCalled()
    })
  })
})
