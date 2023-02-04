import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import Swal from "sweetalert2"
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  alert: string = ""

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {

    if (localStorage.getItem("token")) {
      this.router.navigateByUrl("/home")
    }

  }

  onLogin(data: any) {
    this.alert = ""
    this.auth.login(data).subscribe(res => {
      if (res.message) {
        this.alert = res.message
      } else if (res.token) {
        localStorage.setItem("token", res.token)
        Swal.fire('Login Successfull', 'Admin', 'success').then(() => {
          this.router.navigateByUrl("/home").then(() => {
            location.reload()
          })
        })
      }
    } , (error)=>{
      
      if(error.status == 400){
         this.alert = error.error.message
      }
      else {
        Swal.fire("Server is Down" , "Please Try Again Later" , "error")
      }
    })
  }

}
