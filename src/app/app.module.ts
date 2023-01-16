import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http"
import {FormsModule} from "@angular/forms"
import { AppComponent } from './app.component';
import { NavbarComponent } from './utils/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { UpdatePatientComponent } from './components/update-patient/update-patient.component';
import { ProcessPatientComponent } from './components/process-patient/process-patient.component';
import { FooterComponent } from './utils/footer/footer.component';
import { TitleComponent } from './utils/title/title.component';
import { PatientComponent } from './utils/patient/patient.component';
import { GlobalErrorHandler } from './global-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    UploadFileComponent,
    UpdatePatientComponent,
    ProcessPatientComponent,
    FooterComponent,
    TitleComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ {
    // processes all errors
    provide: ErrorHandler,
    useClass: GlobalErrorHandler,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
