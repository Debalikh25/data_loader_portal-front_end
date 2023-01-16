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
        if(res.expired == true){
          Swal.fire('Your Session Expired' , 'Please Login Again' , 'info').then(()=>{
            this.router.navigateByUrl("/").then(()=>{
              window.location.reload();
            })
          })
        }
        this.searchByName = true;
        if (res.message) {
          this.message = res.message;
        } else {
          this.patients = res
        }
      })
    } else {
      this.searchByName = false;
     this.ps.getPatientById(this.data , localStorage.getItem("token")).subscribe(res => {
      if(res.expired == true){
        Swal.fire('Your Session Expired' , 'Please Login Again' , 'info').then(()=>{
          this.router.navigateByUrl("/").then(()=>{
            window.location.reload();
          })
        })
      }
         if(res.message){
          this.message = res.message
         }else{
          this.patient = res;
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
      if(res.expired == true){
        Swal.fire('Your Session Expired' , 'Please Login Again' , 'info').then(()=>{
          this.router.navigateByUrl("/").then(()=>{
            window.location.reload();
          })
        })
      }
      if (res.error) {
        Swal.fire("Failed to Update", res.error, 'error');
      } else if (res.message) {
        Swal.fire(res.message, '', 'success').then(() => {
          this.data  = ""
          this.updateFlag = false;
           this.patients = []
          this.patient = {}
          this.router.navigateByUrl("/update")
        })
      }
    })
  }


}
