import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { MatSort, MatTableDataSource } from '@angular/material'

import { IPlanItem } from '../../../models/xpert-plan.interface'

@Component({
  selector: 'app-forecasted-table',
  templateUrl: './forecasted-table.component.html',
  styles: [],
})
export class ForecastedTableComponent implements OnInit, OnChanges {
  @Input() data: IPlanItem[]

  @ViewChild(MatSort, { static: true }) sorter: MatSort

  columns = ['category', 'base-item', 'description', 'points']
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
      default:
        return data[sortHeaderId]
    }
  }
}
