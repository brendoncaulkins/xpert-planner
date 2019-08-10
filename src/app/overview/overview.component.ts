import { Component, OnInit } from '@angular/core'
import { ChartOptions, ChartType } from 'chart.js'
import {
  Label,
  SingleDataSet,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { IPlanItem } from '../models/xpert-plan.interface'
import { PlanService } from '../services/plan/plan.service'

export interface IChartDetails {
  labels: Label[]
  data: SingleDataSet
  type: ChartType
  legend: boolean
  options: ChartOptions
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  plan$: Observable<IPlanItem[]>

  contributionsByCategory$: Observable<IChartDetails>
  status$: Observable<IChartDetails>
  contributionsByMonth$: Observable<IChartDetails>

  constructor(private planService: PlanService) {
    monkeyPatchChartJsLegend()
    monkeyPatchChartJsTooltip()

    this.plan$ = this.planService.plan$

    this.contributionsByCategory$ = this.plan$.pipe(
      map(plan => this.generateContributionsByCategory(plan))
    )

    this.status$ = this.plan$.pipe(map(plan => this.generateStatus(plan)))

    this.contributionsByMonth$ = this.plan$.pipe(
      map(plan => this.generateContributionsByMonth(plan))
    )
    this.contributionsByMonth$.subscribe()
  }

  ngOnInit() {}

  generateContributionsByCategory(items: IPlanItem[]): IChartDetails {
    const dataLabels: Label[] = items.reduce((p: Label[], c: IPlanItem) => {
      if (!p.includes(c.baseItem.category.name)) {
        p.push(c.baseItem.category.name)
      }
      return p
    }, [])
    const dataPoints = dataLabels.map(l =>
      items
        .filter(i => i.baseItem.category.name === l)
        .reduce((p: number, c: IPlanItem) => p + c.points, 0)
    )

    return {
      labels: dataLabels,
      data: dataPoints,
      type: 'pie',
      legend: true,
      options: { responsive: true },
    }
  }

  generateStatus(items: IPlanItem[]): IChartDetails {
    const dataLabels: Label[] = ['Completed', 'Forecasted', 'Stale']
    const dataPoints = [
      items
        .filter(i => !this.isStale(i))
        .reduce((p: number, c: IPlanItem) => p + (c.completed ? c.points : 0), 0),
      items
        .filter(i => !this.isStale(i))
        .reduce((p: number, c: IPlanItem) => p + (c.completed ? 0 : c.points), 0),
      items
        .filter(i => this.isStale(i))
        .reduce((p: number, c: IPlanItem) => p + c.points, 0),
    ]

    return {
      labels: dataLabels,
      data: dataPoints,
      type: 'pie',
      legend: true,
      options: { responsive: true },
    }
  }

  generateContributionsByMonth(items: IPlanItem[]): IChartDetails {
    const months = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(
      offset => new Date(new Date().setMonth(new Date().getMonth() - offset))
    )
    const dataLabels: Label[] = months.map(date => [
      this.toMonthAcronym(date.getMonth()),
      date.getFullYear().toString(),
    ])
    const dataPoints = months.map(month =>
      items
        .filter(i => i.completed && this.isSameMonthAndYear(month, i.completedOn))
        .reduce((p: number, c: IPlanItem) => p + c.points, 0)
    )

    return {
      labels: dataLabels,
      data: dataPoints,
      type: 'bar',
      legend: false,
      options: { responsive: true },
    }
  }

  isStale(item: IPlanItem): boolean {
    if (!item.completed) {
      return false
    }
    const staleDate = new Date(
      new Date(item.completedOn).setFullYear(item.completedOn.getFullYear() + 1)
    )
    return new Date(new Date().setHours(0, 0, 0)) > staleDate
  }

  toMonthAcronym(month: number): string {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    return months[month]
  }

  isSameMonthAndYear(date1: Date, date2: Date): boolean {
    return (
      date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
    )
  }
}
