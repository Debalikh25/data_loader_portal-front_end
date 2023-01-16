import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
@Injectable({
   providedIn: 'root'
})
export class PatientService {

   constructor(private http: HttpClient) { }

   uploadData(formData: any, tkn: any): Observable<any> {

      let headers = new HttpHeaders({
         "auth": `Bearer ${tkn}`
      });

      return this.http.post('http://localhost:7001/api/v1/upload', formData, {
         headers
      });

   }

   getPatientById(id: any, tkn: any): Observable<any> {

      let headers = new HttpHeaders({
         "auth": `Bearer ${tkn}`
      });

      return this.http.get(`http://localhost:7001/api/v1/patient/${id}`, {
         headers
      });

   }

   getPatientByName(name: any, tkn: any): Observable<any> {

      let headers = new HttpHeaders({
         "auth": `Bearer ${tkn}`
      });

      return this.http.get(`http://localhost:7001/api/v1/patient/name/${name}`, {
         headers
      })

   }

   updatePatient(data: any, tkn: any): Observable<any> {

      let headers = new HttpHeaders({
         "auth": `Bearer ${tkn}`
      });

      return this.http.put(`http://localhost:7001/api/v1/patient/updatepatient`, data, {
         headers
      })

   }

   processPatient(data: any, tkn: any): Observable<any> {

      let headers = new HttpHeaders({
         "auth": `Bearer ${tkn}`
      });

      return this.http.put(`http://localhost:7001/api/v1/patient/process/`, data, {
         headers
      });

   }


}
