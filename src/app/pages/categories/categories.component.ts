import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ISUBCAt } from '../../shared/interfaces/isubcat';
import { RouterLink } from '@angular/router';
import { Icategories } from '../../shared/interfaces/icategories';
import { Subscription } from 'rxjs';
import   AOS from 'aos';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesServices= inject(CategoriesService);
   categoriesdestory:Subscription=new  Subscription();


   private readonly ToastrService= inject(ToastrService);
     private readonly CartService= inject(CartService);
   categories:Icategories[]=[];

  SubCategori:ISUBCAt[]=[];

  ngOnInit(): void {
      this.getCategories();
        AOS.init();
  }
   // ***************************************************************
   addProductTocart(id:string):void
   {
     this.CartService.addProducttoCart(id).subscribe(
       {
         next:(eww)=>
         {
           console.log(eww);
           this.ToastrService.success( eww.message , 'FreshCart');
           this.CartService.cartNumber.set(eww.numOfCartItems) 
           

         },
         error:(euw)=>
         {
           console.log(euw);
         }
       }
     )
   }





  // ***************************************************************

  getCategories():void
  {
 this.categoriesdestory=this.categoriesServices.getAllCategories().subscribe(
     {
       next:(err)=>
       {
         // console.log(err.data);
         
        this.categories= err.data;
         
       },
       error:(rro)=>
       {
         console.log(rro);
         
       }
     }
   )
  }


  // GetSunCategor():void
  // {
  //   this.hamada.getAllSUBCategories().subscribe(
  //     {
  //       next:(res)=>
  //       {
  //         this.SubCategori=res.data;
  //      console.log(res.data);
      
  //       },
  //       error:(eww)=>
  //       {
  //         console.log(eww);
          

  //       }
  //     }
  //   )
  // }

}
