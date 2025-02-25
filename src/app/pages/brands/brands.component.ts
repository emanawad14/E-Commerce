import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrands } from '../../shared/interfaces/ibrands';
import { RouterLink } from '@angular/router';
import   AOS from 'aos';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  imports: [ RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent  implements OnInit , OnDestroy{

  private readonly brandsService=inject(BrandsService);

  brandDestory:Subscription=new Subscription
  Brands:IBrands[]=[];


  ngOnInit(): void {
    this.getBrands();
    AOS.init();
      
  }


  getBrands():void
  {
    this.brandsService.getBrandsApi().subscribe(
      {
        next:(res)=>
        {
          this.Brands=res.data
           console.log(res.data);
 
        },
        error:(reson)=>
          {
   console.log(reson);
   
          }
      }
    )
  }
  

  ngOnDestroy(): void {
      this.brandDestory
  }
  


}
