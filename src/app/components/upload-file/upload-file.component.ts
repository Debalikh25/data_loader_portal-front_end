import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2"
import jsPDF from 'jspdf';
import * as  pdfMake from "pdfmake/build/pdfmake"
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake.vfs as any) = pdfFonts.pdfMake.vfs;
let htmlToPdfmake = require("html-to-pdfmake");


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  file: any = null
  response: any = {}
  fileName: string = ""
  loading: boolean = false;
  uploaded: boolean = false
  showInvoice: boolean = false;
  correct: boolean = false;



  constructor(private ps: PatientService , private auth:AuthService , private router:Router) { }

  @ViewChild('result') result: ElementRef | undefined;

  ngOnInit(): void {

  }


  captureFile(event: any) {

    this.file = event.target.files[0];

    const ext = this.file.name.split(".")[1];

    if (!(ext == 'xlsx' || ext == 'xls')) {
      Swal.fire("File Should be of Microsoft excel type", "Please upload the correct file", "warning").then(() => {
        this.file = null
      })
    } else {

      this.fileName = this.file.name;
      this.correct = true
    }
  }

  upload() {
    this.loading = true;
    const file = new FormData();
    file.append("file", this.file)
    this.ps.uploadData(file , localStorage.getItem("token")).subscribe(res => {
     
      //File Uploaded Successfully

        this.file = null;
        this.fileName = "";
        this.correct = false;
        this.uploaded = true;
        this.response = res;
        this.loading = false;
        
    } ,(error)=>{
      if(error.status == 400){
               //Bad Request
        Swal.fire(error.error.message, 'Please Upload Again', 'error').then(() => {
          this.file = null;
          this.fileName = "";
          this.correct = false;
        })
          
     
      }else if(error.status == 401){
          //Expired
        Swal.fire('Your Session Expired' , 'Please Login Again' , 'info').then(()=>{
          this.router.navigateByUrl("/").then(()=>{
            window.location.reload();
          })
        })
        this.loading = false;
      }else if(error.status == 403){
           //Forbidden -> No token present in header
           Swal.fire("No Token Present" , '' , 'error')
      }else if(error.status == 500){
        Swal.fire('Failed to Upload Error' , error.error.message , 'error')
      }
    })

  }

  downloadPdf() {
    const doc = new jsPDF();

    const pdfTable = this.result?.nativeElement;

    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = { content: html };
    const date = new Date();
    pdfMake.createPdf(documentDefinition).download("result-"+date.getDate()+".pdf")
    pdfMake.createPdf(documentDefinition).open();

  }

  uploadAgain() {
    this.file = null;
    this.fileName = "";
    this.correct = false;
    this.uploaded = false;
    this.response = {};
  }


  reset() {
    this.file = null
    this.correct = false
  }

}
