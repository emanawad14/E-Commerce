import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories-details',
  imports: [],
  templateUrl: './categories-details.component.html',
  styleUrl: './categories-details.component.scss'
})
export class CategoriesDetailsComponent  implements OnInit  , OnDestroy{

  private readonly ActivatedRoute= inject(ActivatedRoute);
  private readonly CategoriesService= inject(CategoriesService);
  Routerdestory:Subscription=new Subscription

    categories :Icategories ={} as Icategories


    //**************    on init *********************** */

    ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe(
      {
        next:(p)=>{
       let   idCategories=p.get('id');


       this.CategoriesService.getAllSpecificsCategories(idCategories).subscribe(
        {
          next:(res)=>
          {
            console.log(res.data);
         this.categories   =res.data
          },
          error:(rps)=>
            {
              console.log(rps);
              
            }
        }
       )
        }
      }
    )
}

//*************   On Destory  ********************8 */
ngOnDestroy(): void {
    this.Routerdestory
}

}
