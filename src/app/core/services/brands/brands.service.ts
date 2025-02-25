import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(  private http:HttpClient) { }

  getBrandsApi():Observable<any>
  {
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  getSpecificSBrandsApi(id:string|null):Observable<any>
  {
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  }
}
