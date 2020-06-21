import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

import { IPlanItem } from '../../models/xpert-plan.interface'

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styles: [],
})
export class ItemTableComponent implements OnInit, OnChanges {
  @Input() data: IPlanItem[]
  @Input() tableTitle: string
  @Input() columns = ['category', 'base-item', 'description', 'points', 'completion-date']

  @ViewChild(MatSort, { static: true }) sorter: MatSort

  dataSource: MatTableDataSource<IPlanItem>

  constructor() {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit() {
    this.dataSource.sort = this.sorter
    this.dataSource.sortingDataAccessor = this.sortAccessor
  }

  ngOnChanges() {
    this.dataSource.data = this.data
  }

  sortAccessor(data: IPlanItem, sortHeaderId: string): string | number {
    switch (sortHeaderId) {
      case 'category':
        return data.baseItem.category.name
      case 'base-item':
        return data.baseItem.type
      case 'completion-date':
        return data.completedOn.getTime()
      default:
        return data[sortHeaderId]
    }
  }
}
