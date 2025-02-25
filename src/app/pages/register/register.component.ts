import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading:boolean=false;
  msError:string='';
  isSuccess:string='';

  private readonly authServices= inject (AuthService);
  private readonly router= inject (Router);
   ToastrService= inject (ToastrService);

  Register:FormGroup=new FormGroup(
    {
      name: new FormControl(null ,[Validators.required ,Validators.minLength(3) , Validators.maxLength(20)]),
      email: new FormControl(null , [ Validators.required,Validators.email]),
      password: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)]),
      rePassword: new FormControl(null , [Validators.required]),
      phone: new FormControl(null ,[Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/)]),

    },this.confirmForm
  );


    submitForm():void
  {
    // console.log(this.Register.value);

    if( this.Register.valid)
    {
      this.isLoading=true;
      this.authServices.getAllRegister(this.Register.value).subscribe({
        next:(ree)=>{
         console.log(ree);
        if(ree.message ==='success')
         {
         //navagiate

         setTimeout(() => {
          
          this.router.navigate(['/login']);
          this.ToastrService.success(  ree.message,'go to login and complete the information ')

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




  confirmForm(group:AbstractControl)
  {
    const password= group.get('password')?.value;
    const rePassword= group.get('rePassword')?.value;

    return password===rePassword ? null :{mismatch :true}

  }
}
