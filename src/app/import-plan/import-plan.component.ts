import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { IPlanItem } from '../models/xpert-plan.interface'
import { BaseItemService } from '../services/base-item/base-item.service'
import { PlanService } from '../services/plan/plan.service'
import { supportedFileTypes } from '../utils/file-conversions'

@Component({
  selector: 'app-import-plan',
  templateUrl: './import-plan.component.html',
  styleUrls: ['./import-plan.component.css'],
})
export class ImportPlanComponent {
  constructor(
    private planService: PlanService,
    private baseItemService: BaseItemService,
    private router: Router
  ) {}

  onFileSelected() {
    const inputNode: any = document.querySelector('#file-upload')
    const files: FileList = inputNode.files
    const file = files[0]

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader()

      reader.onload = (e: ProgressEvent) => {
        const data = reader.result as string
        const fileExt = file.name.split('.').pop()
        const fileFormat = supportedFileTypes.find(type => type.extension === fileExt)
        const importedPlan: IPlanItem[] = fileFormat.importFn(
          data,
          this.baseItemService.list.value
        )
        this.planService.setPlan(importedPlan)
        this.router.navigate(['plan'])
      }

      reader.readAsText(file)
    }
  }
}
