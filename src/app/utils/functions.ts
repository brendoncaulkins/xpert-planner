import { SimpleChange } from '@angular/core'

export function hasChanged(change: SimpleChange): boolean {
  return change && change.previousValue !== change.currentValue
}

export function stringCompare(a: string, b: string): number {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}
