import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
 usetData:any=null;
  constructor( private httpclient :HttpClient) { }

  routers=inject(Router);
  ToastrService=inject(ToastrService);

  getAllRegister(data:object):Observable<any>

  {

     return this.httpclient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',data)
  }

  getAllLogin(data:object):Observable<any>

  {

     return this.httpclient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',data)
  }



  userTokenData():void
  {
    if(localStorage.getItem('usertoken')!== null)
    {

   this.usetData=jwtDecode(localStorage.getItem('usertoken')!);
    }
  }


  removeTokenData():void
  {
    localStorage.removeItem('usertoken');
    this.usetData='';
    this.ToastrService.error('You are about to log out and register again');
    this.routers.navigate(['/register']);
   
  }

  getEmailVerifify(data:object):Observable<any>
  {
    return this.httpclient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords' , data)
  }


  getCodeVerifiy(data:object):Observable<any>
  {
   return  this.httpclient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',data)
  }
  


  getPasswordVerifiy(data:object):Observable<any>
  {
    return this.httpclient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword' ,data)
  }
}
