import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { PatientService } from 'src/app/services/patient.service';
@Component({
  selector: 'app-process-patient',
  templateUrl: './process-patient.component.html',
  styleUrls: ['./process-patient.component.css']
})
export class ProcessPatientComponent implements OnInit {

  title: string = "Process Patient"
  data: any = ""
  patients: any[] = []
  searchByName: boolean = false;
  message: string = ""
  patient: any = {}

  constructor(private ps: PatientService, private auth:AuthService ,private router: Router) { }

  ngOnInit(): void {
  }

  search() {
    this.patient = {}
    this.patients = []
    this.message = ""
    if (isNaN(this.data)) {
      this.ps.getPatientByName(this.data , localStorage.getItem("token")).subscribe(res => {
        this.searchByName = true;
        if(res.expired == true){
          Swal.fire('Your Session Expired' , 'Please Login Again' , 'info').then(()=>{
            this.router.navigateByUrl("/").then(()=>{
              window.location.reload();
            })
          })
        }
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
        if (res.message) {
          this.message = res.message
        } else {
          this.patient = res;
        }

      })

    }

  }

  process(patient: any) {
    this.patient = patient;
    Swal.fire({
      title: 'Patient Will be Send to DownStream System For Processing',
      text: 'If you select yes , changes cannot be reverted back',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Send',
      cancelButtonText: 'Dont Send'
    }).then((result) => {
      if (result.value) {
        this.patient.status = "Processed"
        this.ps.processPatient(this.patient , localStorage.getItem("token")).subscribe(res => {
          if(res.expired == true){
            Swal.fire('Your Session Expired' , 'Please Login Again' , 'info').then(()=>{
              this.router.navigateByUrl("/").then(()=>{
                window.location.reload();
              })
            })
          }
          if (res.message) {
            Swal.fire(res.message, '', 'success').then(() => {
              this.patients = []
              this.patient = {}
              this.data = ""
              this.searchByName = false
              this.message = ""
              this.router.navigateByUrl("/process")
            })
          }
        })

      }
    })
  }





}
