import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observer } from 'rxjs'

export interface ISnackBarService {
  openSnackBar(message: string, action: string): void
  observerFor<T>(
    action: string,
    next?: (value: T) => void,
    error?: (err: any) => void,
    complete?: () => void
  ): Observer<T>
}

@Injectable()
export class SnackBarService implements ISnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string = null) {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
  }

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
