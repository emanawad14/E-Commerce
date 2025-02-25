import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products/products.service';
import { iproduct } from '../../shared/interfaces/iproducts';
import   AOS from 'aos';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit , OnDestroy {



// *********  View child 
  @ViewChild ('eman') myElement!:ElementRef
    showElement():void
    {
      this.myElement.nativeElement.classList.add('bg-red-700')
    }
  

  private readonly productServices=inject(ProductsService);
   
      private readonly CartService= inject(CartService);
      private readonly ToastrService= inject(ToastrService);
      private readonly wishlistService= inject(WishlistService);



      Productsdestory:Subscription=new  Subscription();


color:string='red'

   products:iproduct[]=[];


//*******************   On init **************************** */

   ngOnInit(): void {
    this.getProducts();
    AOS.init();
}


//**************  Add Product ****************************** */
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


//********************    Add WishList ************************* */
addwishList(id:string):void
{
  this.wishlistService.AddCarttoWishList(id).subscribe(
    {
      next:(eww)=>
        {
          console.log(eww.data);
           this.ToastrService.success( eww.message , 'FreshCart');
           if(eww.status === 'success')
           {
            this.color
           }
          // this.CartService.cartNumber.set(eww.numOfCartItems) ;
          //this.wishlistService.count.set(eww)
          

        },
        error:(euw)=>
        {
          console.log(euw);
        }

    }
  )
}

   
  
   

//*************    Get Products ************************8 */
   getProducts():void
  {
   this.Productsdestory= this.productServices.getAllProducts().subscribe(
      {
        next:(res)=>
        {
          this.products=res.data;
           console.log(res.data);
           
        },
        error:(err)=>
        {
          console.log(err);
          
        }
      })
  }






//********************************** */

  ngOnDestroy(): void {
    this.Productsdestory.unsubscribe();
   }

}
