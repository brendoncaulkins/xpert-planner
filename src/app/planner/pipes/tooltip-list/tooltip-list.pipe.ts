import { Pipe, PipeTransform } from '@angular/core'

// Taken from: https://stackoverflow.com/questions/53197606/is-it-possible-to-have-a-list-inside-of-an-angular-material-tooltip
@Pipe({ name: 'tooltipList' })
export class TooltipListPipe implements PipeTransform {
  transform(items: string[]): string {
    return items.map(i => `• ${i}\n`).join('')
  }
}
