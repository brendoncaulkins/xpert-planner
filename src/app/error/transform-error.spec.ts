import { HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

import { transformError } from './transform-error'

describe('transformError', () => {
  it('returns the provided error if string', done => {
    // tslint:disable-next-line: no-string-throw
    throwError('Test error message')
      .pipe(
        catchError(transformError),
        tap({
          // Fail test if we don't see the error
          next: () => expect(true).toBe(false),
          // Check the error message is formatted as expected
          error: msg => expect(msg).toBe('Test error message'),
        }),
        // mask the error so Jest doesn't have a false positive
        catchError(() => {
          done()
          return of()
        })
      )
      .subscribe()
  })

  it('returns the provided error if string', done => {
    // tslint:disable-next-line: no-string-throw
    throwError({ error: new ErrorEvent('', { message: 'Event error message' }) })
      .pipe(
        catchError(transformError),
        tap({
          // Fail test if we don't see the error
          next: () => expect(true).toBe(false),
          // Check the error message is formatted as expected
          error: msg => expect(msg).toBe('Error! Event error message'),
        }),
        // mask the error so Jest doesn't have a false positive
        catchError(() => {
          done()
          return of()
        })
      )
      .subscribe()
  })

  it('returns the provided error if string', done => {
    // tslint:disable-next-line: no-string-throw
    throwError(new HttpErrorResponse({ status: 404, statusText: 'Status error message' }))
      .pipe(
        catchError(transformError),
        tap({
          // Fail test if we don't see the error
          next: () => expect(true).toBe(false),
          // Check the error message is formatted as expected
          error: msg => expect(msg).toBe('Request failed with 404 Status error message'),
        }),
        // mask the error so Jest doesn't have a false positive
        catchError(() => {
          done()
          return of()
        })
      )
      .subscribe()
  })

  it('returns the default error if string', done => {
    // tslint:disable-next-line: no-string-throw
    throwError(null)
      .pipe(
        catchError(transformError),
        tap({
          // Fail test if we don't see the error
          next: () => expect(true).toBe(false),
          // Check the error message is formatted as expected
          error: msg => expect(msg).toBe('An unknown error has occurred'),
        }),
        // mask the error so Jest doesn't have a false positive
        catchError(() => {
          done()
          return of()
        })
      )
      .subscribe()
  })
})
