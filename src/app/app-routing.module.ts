import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {HomeComponent} from "./components/home/home.component"
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { UpdatePatientComponent } from './components/update-patient/update-patient.component';
import { ProcessPatientComponent } from './components/process-patient/process-patient.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  {path : 'home' , component : HomeComponent},
  {path : "upload" , component : UploadFileComponent},
  {path : "update" , component : UpdatePatientComponent},
  {path : "process" , component : ProcessPatientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
