import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private httpclient: HttpClient ) { }
  

  getAllCategories():Observable<any>
  {
     return  this.httpclient.get('https://ecommerce.routemisr.com/api/v1/categories');
  }
  getAllSpecificsCategories(id:string |null):Observable<any>
  {
     return  this.httpclient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  }
//******************************  Sub Categories        *********************************** */

getAllSUBCategories():Observable<any>
{
   return  this.httpclient.get('https://ecommerce.routemisr.com/api/v1/subcategories');
}



getAllSpecificsSUBCategories(id:string |null):Observable<any>
  {
     return  this.httpclient.get(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`);
  }

}
