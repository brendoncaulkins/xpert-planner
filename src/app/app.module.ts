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
import { authFactory } from './auth/services/auth.factory'
import { AuthService } from './auth/services/auth.service'
import { ErrorComponent } from './error/error.component'
import { HomeComponent } from './home/home.component'
import { MaterialModule } from './material.module'
import { MessagingModule } from './messaging/messaging.module'
import { SnackBarService } from './messaging/services/snack-bar/snack-bar.service';
import { RegisterComponent } from './auth/register/register.component'

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
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
    {
      provide: AuthService,
      useFactory: authFactory,
      deps: [AngularFireAuth, SnackBarService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
