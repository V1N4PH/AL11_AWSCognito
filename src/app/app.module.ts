import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthorizationService } from './service/authorization.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { RestapiComponent } from './restapi/restapi.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    PageNotFoundComponent,
    RestapiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent},
      {path:'', redirectTo:'login', pathMatch:'full'},
      {path:'restapi', canActivate:[AuthGuard], component:RestapiComponent},
      {path:'**', component: PageNotFoundComponent}
    ])
  ],
  providers: [AuthorizationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
