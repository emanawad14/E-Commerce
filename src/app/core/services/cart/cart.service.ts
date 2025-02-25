import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import {  Observable, single } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
   myToken=localStorage.getItem('usertoken')!; 
   cartNumber:WritableSignal<number>=signal(0);

  constructor( private httpclient:HttpClient) { }

  addProducttoCart(id:string):Observable<any>
  {
    return this.httpclient.post(`https://ecommerce.routemisr.com/api/v1/cart` ,
      
      {
        
          "productId": id
      },
      {
        headers:{
          token:this.myToken

        }
      }

      
    )
  }



  getLoggedUserCart():Observable<any>
  {
    return this.httpclient.get(`https://ecommerce.routemisr.com/api/v1/cart`,
      {
       headers:
       {
        token:this.myToken 
       }
      }
    )
  }



  removeProduct(id:string):Observable<any>
  {
    return this.httpclient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        headers:
        {
           token :this.myToken
        }
      }
    )
  }


  UpdataCart(id:string,count:number):Observable<any>
  {
   return this.httpclient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      
        "count": count
    },
    {
      headers:
      {
        token:this.myToken
      }
    }
    
   )
  }

  clearCart():Observable<any>
  {
    return this.httpclient.delete(`https://ecommerce.routemisr.com/api/v1/cart` ,
    {
      headers:
      {
        token:this.myToken
      }
    }
    )
  }
}
