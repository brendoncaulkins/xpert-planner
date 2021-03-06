import { Component, OnInit } from '@angular/core'
import { ChartOptions, ChartType } from 'chart.js'
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts'
import { Observable } from 'rxjs'
import { map, withLatestFrom } from 'rxjs/operators'

import { ICategory, IPlanItem } from '../models/xpert-plan.interface'
import { CategoryService } from '../services/category/category.service'
import { PlanService } from '../services/plan/plan.service'

export interface IChartDetails {
  labels: Label[]
  data: number[]
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
  earnedContributionsByCategory$: Observable<IChartDetails>
  status$: Observable<IChartDetails>
  contributionsByMonth$: Observable<IChartDetails>
  pastSixMonthsTotal$: Observable<number>
  pastYearTotal$: Observable<number>

  constructor(
    private planService: PlanService,
    private categoryService: CategoryService
  ) {
    monkeyPatchChartJsLegend()
    monkeyPatchChartJsTooltip()

    this.plan$ = this.planService.plan$

    this.contributionsByCategory$ = this.plan$.pipe(
      withLatestFrom(this.categoryService.list),
      map(([plan, categories]) => this.generateContributionsByCategory(categories, plan))
    )
    this.earnedContributionsByCategory$ = this.plan$.pipe(
      map(plan => plan.filter(item => item.completed)),
      withLatestFrom(this.categoryService.list),
      map(([plan, categories]) => this.generateContributionsByCategory(categories, plan))
    )

    this.status$ = this.plan$.pipe(map(plan => this.generateStatus(plan)))

    this.contributionsByMonth$ = this.plan$.pipe(
      map(plan => this.generateContributionsByMonth(plan))
    )
    this.pastSixMonthsTotal$ = this.contributionsByMonth$.pipe(
      map(contributions =>
        contributions.data.reduce(
          (sum: number, n: number, i: number) => (i >= 6 ? sum + n : sum),
          0
        )
      )
    )
    this.pastYearTotal$ = this.contributionsByMonth$.pipe(
      map(contributions =>
        contributions.data.reduce((sum: number, n: number) => sum + n, 0)
      )
    )
  }

  ngOnInit() {}

  generateContributionsByCategory(
    categories: ICategory[],
    items: IPlanItem[]
  ): IChartDetails {
    const dataLabels: Label[] = categories.map(c => c.name)
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
    const dataLabels: Label[] = ['Completed', 'Forecasted']
    const dataPoints = [
      items.reduce((p: number, c: IPlanItem) => p + (c.completed ? c.points : 0), 0),
      items.reduce((p: number, c: IPlanItem) => p + (c.completed ? 0 : c.points), 0),
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
    const months = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(offset => {
      const monthStart = new Date()
      monthStart.setMonth(new Date().getMonth() - offset)
      monthStart.setDate(1)
      return monthStart
    })
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
