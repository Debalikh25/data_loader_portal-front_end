import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

    login(data:any):Observable<any>{
        return this.http.post('http://localhost:7000/api/v1/login' , data )
    }

    expired(token:string){

       const tkn : string = "Bearer "+token;
         
      let headers = new HttpHeaders({
         "auth" :  tkn
         });
       return this.http.get("http://localhost:7001/api/v1/expired" ,  {
        headers
       });
    }
   
}
