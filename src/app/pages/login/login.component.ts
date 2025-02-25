import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isLoading:boolean=false;
    msError:string='';
    isSuccess:string='';
  
    private readonly authServices= inject (AuthService);
    private readonly router= inject (Router);
     ToastrService= inject (ToastrService);
  
   loginForm:FormGroup=new FormGroup(
      {
      
        
        email: new FormControl(null , [ Validators.required,Validators.email]),
        password: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)]),
        
        
      }
    );
  
  
      submitForm():void
    {
      // console.log(this.loginForm.value);
  
      if( this.loginForm.valid)
      {
        this.isLoading=true;
        this.authServices.getAllLogin(this.loginForm.value).subscribe({
          next:(ree)=>{
           console.log(ree);
          if(ree.message ==='success')
           {
           //navagiate
  
           setTimeout(() => {

            //save token 

            localStorage.setItem('usertoken' ,ree.token);

            this.authServices.userTokenData();
            
            this.router.navigate(['/home']);
            this.ToastrService.success(ree.message , 'go to home')
           }, 700);
           this.isSuccess=ree.message 
           }
           this.isLoading=false;
           
          },
          error:(err :HttpErrorResponse)=>
          {
         console.log(err);
         this.isLoading=false;
       this.msError=err.error.message
  
         
          }
  
        })
      }
      
    }
  
  
  
  
    
    

}
