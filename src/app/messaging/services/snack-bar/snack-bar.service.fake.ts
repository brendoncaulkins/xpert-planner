import { Injectable } from '@angular/core'
import { Observer } from 'rxjs'

@Injectable()
export class MockSnackBarService {
  openSnackBar(message: string, action: string = null): void {}

  observerFor<T>(
    action: string,
    next?: (value: T) => void,
    error?: (err: any) => void,
    complete?: () => void
  ): Observer<T> {
    return {
      next: (value: T) => {
        this.openSnackBar(`${action} succeeded!`)
        if (next) {
          next(value)
        }
      },
      error: (err: any) => {
        this.openSnackBar(`${action} failed!`)
        if (error) {
          error(err)
        }
      },
      complete: complete ? complete : () => {},
    } as Observer<T>
  }
}
