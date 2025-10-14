import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';

//Components
import { AppComponent } from './app.component';
import { CreateDoctorComponent } from './components/create-doctor/create-doctor.component';
import { ListDoctorComponent } from './components/list-doctor/list-doctor.component';
import { CreatePatientComponent } from './components/create-patient/create-patient.component';
import { ListPatientComponent } from './components/list-patient/list-patient.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateDoctorComponent,
    ListDoctorComponent,
    CreatePatientComponent,
    ListPatientComponent,
    UsersComponent,
    CreateUserComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
