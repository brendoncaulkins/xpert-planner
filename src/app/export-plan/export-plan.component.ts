import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { SubSink } from 'subsink'

import { IPlanItem } from '../models/xpert-plan.interface'
import { PlanService } from '../services/plan/plan.service'
import { ISupportedFileType, supportedFileTypes } from '../utils/file-conversions'

@Component({
  selector: 'app-export-plan',
  templateUrl: './export-plan.component.html',
  styleUrls: ['./export-plan.component.css'],
})
export class ExportPlanComponent implements OnDestroy {
  exportOptions = supportedFileTypes

  exportFormat = new FormControl(null, Validators.required)

  subs = new SubSink()

  constructor(private planService: PlanService) {}

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  onExport() {
    const format: ISupportedFileType = this.exportFormat.value
    this.subs.add(
      this.planService.plan$.subscribe((plan: IPlanItem[]) =>
        this.offerFile(format.exportFn(plan), format.extension)
      )
    )
  }

  offerFile(data: string, format: string) {
    const blob = new Blob([data], { type: `text/${format}` })
    const filename = `xpert_plan.${format}`

    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, filename)
    } else {
      const elem = window.document.createElement('a')
      elem.href = window.URL.createObjectURL(blob)
      elem.download = filename
      document.body.appendChild(elem)
      elem.click()
      document.body.removeChild(elem)
    }
  }
}
