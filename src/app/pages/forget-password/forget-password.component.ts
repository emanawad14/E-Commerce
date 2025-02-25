import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  imports: [ ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  private readonly AuthService = inject(AuthService);
  private readonly  Router= inject(Router);
  private readonly ToastrService = inject(ToastrService);
  step:number =1;
  isLoading:boolean=false;

  verifyEmailForget:FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required , Validators.email])
    }
  )

  verifyEmail():void{
   if(this.verifyEmailForget.valid)
   {
    this.isLoading=true;
  //  console.log( this.verifyEmailForget.value);
   this.AuthService.getEmailVerifify(this.verifyEmailForget.value).subscribe(
    {
      next:(res)=>{
        console.log(res);
        if(res.statusMsg  ==='success')
        {
          this.step=2;
          this.ToastrService.success(res.message , 'check phone and write code');
        }
        this.isLoading=false;
      },
   
      error:(ree)=>{
   console.log(ree);
   this.isLoading=false;
   
      }
    }
   )


   
   }
  }


 // ************************************* Code Email *************************************

 CodeEmailForget:FormGroup = new FormGroup(
  {
    resetCode:new FormControl (null , [Validators.required , Validators.pattern(/^[0-9]{6}$/)])
  }
 )



 CodeEmail():void
 {
  if(this.CodeEmailForget.valid)
  {
    this.isLoading=true;
  //  console.log( this.CodeEmailForget.value);
   this.AuthService.getCodeVerifiy(this.CodeEmailForget.value).subscribe(
    {
      next:(res)=>{
        console.log(res);
        if(res.status === 'Success')
        {
          this.step=3;
          this.ToastrService.success(res.message , 'go to write a new password ')
        }
       
        this.isLoading=false;
        
      },
      error:(ree)=>{
   console.log(ree);
   this.isLoading=false;
   
      }

    }
   )
   
  }
 }

 // ************************************* Password *************************************

 PasswordEmailForget:FormGroup = new FormGroup(
  {
    email:new FormControl(null , [Validators.required , Validators.email]),
    newPassword:new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)])
  }
 )

 PasswordEmail():void
 {
 if(this.PasswordEmailForget.valid)
 {
  // console.log(this.PasswordEmailForget.value);
  this.isLoading=true;
  this.AuthService.getPasswordVerifiy(this.PasswordEmailForget.value).subscribe(
    {
      next:(res)=>{
        console.log(res);

        localStorage.setItem('usertoken' , res.token);
        this.Router.navigate(['/home']);
        this.ToastrService.success(res.message , 'I have completed the required steps. Welcome, dear, to the site')
        this.isLoading=false;
        
      },
      error:(ree)=>{
   console.log(ree);
   this.isLoading=false;
   
      }
    }
  )
  
 }
 }

}
