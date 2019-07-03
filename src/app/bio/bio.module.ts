import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { BioFormComponent } from './bio-form/bio-form.component'
import { BioRoutingModule } from './bio-routing.module'
import { BioViewComponent } from './bio-view/bio-view.component'

@NgModule({
  declarations: [BioFormComponent, BioViewComponent],
  imports: [CommonModule, BioRoutingModule],
})
export class BioModule {}
