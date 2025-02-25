import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  count:WritableSignal<number>=signal(0)

  constructor(private httpclient:HttpClient) { }

  AddCarttoWishList(id:string):Observable<any>
  {
    return this.httpclient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        
          "productId": id
      }
      
    )
  }


  //******************************************************* */

  getLoggedUserWishList():Observable<any>
  {
    return this.httpclient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`)
  }
//******************************************************* */

RemovewishList(id:string):Observable<any>
{
  return this.httpclient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`)
}

}
