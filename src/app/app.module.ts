import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BioFormComponent } from './bio-form/bio-form.component'
import { ErrorComponent } from './error/error.component'
import { HomeComponent } from './home/home.component'
import { MaterialModule } from './material.module'
import { ItemFormComponent } from './plan/item-form/item-form.component'
import { ItemListComponent } from './plan/item-list/item-list.component'
import { ReviewComponent } from './review/review.component'

@NgModule({
  declarations: [
    AppComponent,
    BioFormComponent,
    ErrorComponent,
    HomeComponent,
    ItemFormComponent,
    ItemListComponent,
    ReviewComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
