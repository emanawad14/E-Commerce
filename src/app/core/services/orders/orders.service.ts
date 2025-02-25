import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  
  userData:any=null;

  constructor(private httpclient:HttpClient) { }
  myToken=localStorage.getItem('usertoken')!;

  checkOutPayment(id:string , data:object):Observable<any>
  {
    return this.httpclient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,

      {
        "shippingAddress": data
      },
      {
        headers:
        {
        token:this.myToken
        }
      }
    
    )
  }




  getProductshopping(id:string):Observable<any>
  {
  return  this.httpclient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  }


  getuserID():any
  {
    if(this.myToken != null!)
    {
      this.userData=jwtDecode(this.myToken);
      return this.userData.id;
    }
  }
}
