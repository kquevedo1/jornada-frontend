import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//Componentes
import { LoginComponent } from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import { ListDoctorComponent } from './components/list-doctor/list-doctor.component';
import { CreateDoctorComponent } from './components/create-doctor/create-doctor.component';
import { ListPatientComponent } from './components/list-patient/list-patient.component';
import { CreatePatientComponent } from './components/create-patient/create-patient.component';
import {UsersComponent} from './components/users/users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path:'create-doctor',component: CreateDoctorComponent},
  {path:'edit-doctor/:id',component: CreateDoctorComponent},
  {path:'create-patient',component: CreatePatientComponent},
  {path:'edit-patient/:id',component: CreatePatientComponent},
  {path:'list-doctor',component: ListDoctorComponent},
  {path:'list-patient',component: ListPatientComponent},
  {path: 'users', component:UsersComponent},
  {path:'create-user',component:CreateUserComponent},
  {path:'edit-user/:id',component: CreateUserComponent},
  {path: '**', redirectTo:'', pathMatch:'full'} //para redirigirme a la ruta inicial si colocan mal el url
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
