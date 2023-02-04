import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler } from "@angular/core";
import Swal from "sweetalert2";
export class GlobalErrorHandler implements ErrorHandler{

    handleError(error: any): void {
        
        if(error instanceof HttpErrorResponse){
            let message = error.message
            Swal.fire("Server is Down" , "Please Try Again Later" , "error")
        }else{
            console.log("From Global Error handler")
        }
    }
}