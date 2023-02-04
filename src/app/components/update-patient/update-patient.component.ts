import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { PatientService } from 'src/app/services/patient.service';
@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {

  title: string = "Update Patient"
  data: any = ""
  patients: any[] = []
  searchByName: boolean = false;
  message: string = ""
  patient: any = {}
  updateFlag: boolean = false;


  constructor(private ps: PatientService, private auth:AuthService ,  private router: Router) { }

  ngOnInit(): void {
  }

  search() {
    this.patient = {}
    this.patients = []
    this.message = ""
    if (isNaN(this.data)) {
      this.ps.getPatientByName(this.data , localStorage.getItem("token")).subscribe(res => {

       this.searchByName = true;
        this.patients = res
        
      } , (error)=>{
        if(error.status == 400){
            //Bad Request
            this.message  = error.error.message
        }else if(error.status == 401){
            //Expired
          Swal.fire('Your Session Expired' , 'Please Login Again' , 'info').then(()=>{
            this.router.navigateByUrl("/").then(()=>{
              window.location.reload();
            })
          })
        }else if(error.status == 403){
             //Forbidden -> No token present in header
              Swal.fire("No Token Present" , '' , 'error')
        }
      })
    } else {
      this.searchByName = false;
     this.ps.getPatientById(this.data , localStorage.getItem("token")).subscribe(res => {
       this.patient = res;
      } ,(error)=>{
        if(error.status == 400){
            //Bad Request
            this.message  = error.error.message
        }else if(error.status == 401){
            //Expired
          Swal.fire('Your Session Expired' , 'Please Login Again' , 'info').then(()=>{
            this.router.navigateByUrl("/").then(()=>{
              window.location.reload();
            })
          })
        }else if(error.status == 403){
             //Forbidden -> No token present in header
             Swal.fire("No Token Present" , '' , 'error')
        }
      })

    }

  }

  update(patient: any) {
    this.patient = patient;
    this.updateFlag = true;

  }

  cancelUpdate() {
    this.updateFlag = false;
  }

  onUpdate(value: any) {
     
  
    this.ps.updatePatient(this.patient , localStorage.getItem("token")).subscribe((res) => {
  
        Swal.fire(res.message, '', 'success').then(() => {
          this.data  = ""
          this.updateFlag = false;
           this.patients = []
          this.patient = {}
          this.router.navigateByUrl("/update")
        })
      
    } ,(error)=>{
      if(error.status == 400){
          //Bad Request - Patient Not Found
          Swal.fire("Failed to Update", error.error.message, 'error');
     
      }else if(error.status == 401){
          //Expired
          Swal.fire('Your Session Expired' , 'Please Login Again' , 'info').then(()=>{
            this.router.navigateByUrl("/").then(()=>{
              window.location.reload();
            })
          })
      }else if(error.status == 403){
           //Forbidden -> No token present in header
           Swal.fire("No Token Present" , '' , 'error')
      }
      else {
        Swal.fire("Server is Down" , "Please Try Again Later" , "error")
      }
    })
  }


}
