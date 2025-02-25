import { iproduct } from './../../shared/interfaces/iproducts';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrands } from '../../shared/interfaces/ibrands';
import { Subscription } from 'rxjs';
// import { iproduct } from '../../shared/interfaces/iproducts';

@Component({
  selector: 'app-brand-details',
  imports: [],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss'
})
export class BrandDetailsComponent implements OnInit , OnDestroy {
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly brandsService=inject(BrandsService);


  routerDestory :Subscription = new Subscription

  details: IBrands ={} as IBrands;

  ngOnInit(): void {
      this. ActiveRoute();
  }

 
  

  ActiveRoute():void
  {
    this.activatedRoute.paramMap.subscribe(
      {
        next:(p)=>
        {
   let idBrand= p.get('id');

   this.brandsService.getSpecificSBrandsApi(idBrand).subscribe({
    next:(resp)=>
    {
    console.log(resp.data);
    this.details=resp.data;
    
    },
    error:(ree)=>
    {
      console.log(ree);
    }
  })
    
        },
        
      }
    )
  }


  ngOnDestroy(): void {
      this.routerDestory
  }

}
