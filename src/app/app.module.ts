import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ErrorComponent } from './error/error.component'
import { HomeComponent } from './home/home.component'
import { MaterialModule } from './material.module'
import { MessagingModule } from './messaging/messaging.module'

@NgModule({
  declarations: [AppComponent, ErrorComponent, HomeComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MessagingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
