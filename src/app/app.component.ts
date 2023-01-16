import { Component , OnInit } from '@angular/core';
import Swal from "sweetalert2"
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'client';

    constructor(private auth : AuthService , private router : Router){}


  ngOnInit(): void {

    if(localStorage.getItem("token")){
      this.expired(localStorage.getItem("token"));
    }
    
  }

   expired(token:any){
    this.auth.expired(token).subscribe((res:any)=>{
        if(res.error){
            Swal.fire(res.error , '' ,  'error')
        }else{
          
           if(res.expired == true){
              localStorage.removeItem("token");
              Swal.fire('Your Session has Expired' ,  'Please Login Again' , 'info').then(()=>{
                this.router.navigateByUrl("/").then(()=>{
                   window.location.reload();
                })
              })
           }

        }
    })
   }

  
    
}
