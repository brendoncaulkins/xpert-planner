import { Component } from '@angular/core'

@Component({
  selector: 'app-import-plan',
  templateUrl: './import-plan.component.html',
  styleUrls: ['./import-plan.component.css'],
})
export class ImportPlanComponent {
  constructor() {}

  onFileSelected() {
    const inputNode: any = document.querySelector('#file-upload')

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader()

      reader.onload = (e: any) => {
        console.log(e)
      }

      reader.readAsArrayBuffer(inputNode.files[0])
    }
  }
}
