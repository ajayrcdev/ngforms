import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AppComponent } from './app.component';
import { LoginFormComponent } from "./login/login-form.component";
import { RegisterFormComponent } from "./register/register-form.component";
import { ErrorComponent } from "./404/error.component";
import { HomePageComponent } from "./homePage/home-page.component";
import { UserService } from "./services/user.service";
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from "./profile/profile.component";

let appRoutes: Routes = [
  { path: 'register', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', component: HomePageComponent }, 
  { path: '**', component: ErrorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ErrorComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    ButtonsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [ UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
