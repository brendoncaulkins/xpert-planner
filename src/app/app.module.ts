import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { environment } from '..//environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthGuard } from './auth/auth.guard'
import { LoginComponent } from './auth/login/login.component'
import { LogoutComponent } from './auth/logout/logout.component'
import { FirebaseAuthService } from './auth/services/auth.firebase.service'
import { AuthService } from './auth/services/auth.service'
import { ErrorComponent } from './error/error.component'
import { HomeComponent } from './home/home.component'
import { MaterialModule } from './material.module'
import { MessagingModule } from './messaging/messaging.module'

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MessagingModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    { provide: AuthService, useClass: FirebaseAuthService },
    AngularFireAuth,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
