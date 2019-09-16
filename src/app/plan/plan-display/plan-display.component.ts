import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatSort, MatTableDataSource } from '@angular/material'
import { map } from 'rxjs/operators'
import { IPlanItem } from 'src/app/models/xpert-plan.interface'
import { PlanService } from 'src/app/services/plan/plan.service'
import { SubSink } from 'subsink'

@Component({
  selector: 'app-plan-display',
  templateUrl: './plan-display.component.html',
  styleUrls: ['./plan-display.component.css'],
})
export class PlanDisplayComponent implements OnInit, OnDestroy {
  @ViewChild('completedSorter', { static: true }) completedItemSorter: MatSort
  @ViewChild('forecastedSorter', { static: true }) forecastedItemSorter: MatSort

  completedItemColumns = [
    'category',
    'base-item',
    'description',
    'points',
    'completion-date',
  ]
  completedItemData: MatTableDataSource<IPlanItem>

  forecastedItemColumns = ['category', 'base-item', 'description', 'points']
  forecastedItemData: MatTableDataSource<IPlanItem>

  subsink = new SubSink()

  constructor(private planService: PlanService) {
    this.completedItemData = new MatTableDataSource<IPlanItem>()
    this.forecastedItemData = new MatTableDataSource<IPlanItem>()

    this.subsink.add(
      this.planService.plan$
        .pipe(map(items => items.filter(i => i.completed)))
        .subscribe(data => (this.completedItemData.data = data)),
      this.planService.plan$
        .pipe(map(items => items.filter(i => !i.completed)))
        .subscribe(data => (this.forecastedItemData.data = data))
    )
  }

  ngOnInit() {
    this.completedItemData.sort = this.completedItemSorter
    this.forecastedItemData.sort = this.forecastedItemSorter
  }

  ngOnDestroy() {
    this.subsink.unsubscribe()
  }
}
