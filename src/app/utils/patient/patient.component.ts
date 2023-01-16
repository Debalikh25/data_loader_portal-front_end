import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor() { }

  @Input() patient: any;
  @Input() process: any;
  @Output() updatePatient = new EventEmitter()

  ngOnInit(): void {
  }

  update(patient: any) {
    this.updatePatient.emit(patient)
  }

}

// //patientAddress
// : 
// "Sripur Road Kulti"
// patientContactNumber
// : 
// 8918120764
// patientDateOfBirth
// : 
// "07-25-1999"
// patientDrugId
// : 
// "12345-9876-12"
// patientDrugName
// : 
// "carvedilol"
// patientEmail
// : 
// "debalikh25@gmail.com"
// patientId
// : 
// 1
// patientName
// : 
// "Debalikh Chatterjee"
// status
// : 
// "Inducted"
